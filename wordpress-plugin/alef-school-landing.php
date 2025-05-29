<?php
/**
 * Plugin Name: ALEF School Landing Page
 * Plugin URI: https://alefschool.com
 * Description: A complete landing page plugin for ALEF School Hebrew language learning
 * Version: 1.0.0
 * Author: ALEF School Team
 * Text Domain: alef-school-landing
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ALEF_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ALEF_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('ALEF_PLUGIN_VERSION', '1.0.0');

class AlefSchoolLanding {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_alef_signup_submit', array($this, 'handle_signup'));
        add_action('wp_ajax_nopriv_alef_signup_submit', array($this, 'handle_signup'));
        add_shortcode('alef_landing', array($this, 'landing_page_shortcode'));
        add_action('admin_menu', array($this, 'admin_menu'));
        
        // Create database table on activation
        register_activation_hook(__FILE__, array($this, 'create_table'));
    }
    
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('alef-school-landing', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Only load on pages with the shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'alef_landing')) {
            wp_enqueue_style('alef-landing-style', ALEF_PLUGIN_URL . 'assets/style.css', array(), ALEF_PLUGIN_VERSION);
            wp_enqueue_script('alef-landing-script', ALEF_PLUGIN_URL . 'assets/script.js', array('jquery'), ALEF_PLUGIN_VERSION, true);
            
            wp_localize_script('alef-landing-script', 'alef_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('alef_signup_nonce')
            ));
        }
    }
    
    public function landing_page_shortcode($atts) {
        $atts = shortcode_atts(array(
            'show_header' => 'true',
            'show_footer' => 'true'
        ), $atts);
        
        ob_start();
        include ALEF_PLUGIN_PATH . 'templates/landing-page.php';
        return ob_get_clean();
    }
    
    public function handle_signup() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['signup_nonce'], 'alef_signup_nonce')) {
            wp_die(json_encode(array('success' => false, 'message' => 'Security check failed')));
        }
        
        // Sanitize form data
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $city = sanitize_text_field($_POST['city']);
        
        // Validate required fields
        if (empty($name) || empty($email) || empty($phone) || empty($city)) {
            wp_die(json_encode(array('success' => false, 'message' => 'جميع الحقول مطلوبة')));
        }
        
        // Validate email
        if (!is_email($email)) {
            wp_die(json_encode(array('success' => false, 'message' => 'البريد الإلكتروني غير صحيح')));
        }
        
        // Save to database
        global $wpdb;
        $table_name = $wpdb->prefix . 'alef_signups';
        
        $result = $wpdb->insert(
            $table_name,
            array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'city' => $city,
                'signup_date' => current_time('mysql')
            ),
            array('%s', '%s', '%s', '%s', '%s')
        );
        
        if ($result === false) {
            wp_die(json_encode(array('success' => false, 'message' => 'حدث خطأ في حفظ البيانات')));
        }
        
        // Send notification emails
        $this->send_notification_email($name, $email, $phone, $city);
        
        wp_die(json_encode(array('success' => true, 'message' => 'تم التسجيل بنجاح')));
    }
    
    public function create_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'alef_signups';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name tinytext NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(20) NOT NULL,
            city tinytext NOT NULL,
            signup_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function send_notification_email($name, $email, $phone, $city) {
        $to = get_option('admin_email');
        $subject = 'تسجيل جديد في مدرسة ألف';
        
        $message = "
        تم تسجيل طالب جديد:
        
        الاسم: $name
        البريد الإلكتروني: $email
        رقم الهاتف: $phone
        المدينة: $city
        
        تاريخ التسجيل: " . current_time('mysql') . "
        ";
        
        $headers = array('Content-Type: text/html; charset=UTF-8');
        wp_mail($to, $subject, nl2br($message), $headers);
        
        // Send confirmation to user
        $user_subject = 'مرحباً بك في مدرسة ألف';
        $user_message = "
        مرحباً $name،
        
        شكراً لتسجيلك في مدرسة ألف!
        
        سنتواصل معك قريباً عبر الواتساب أو الهاتف لبدء رحلتك في تعلم العبرية.
        
        مع أطيب التحيات،
        فريق مدرسة ألف
        ";
        
        wp_mail($email, $user_subject, nl2br($user_message), $headers);
    }
    
    public function admin_menu() {
        add_menu_page(
            'ALEF School',
            'ALEF School',
            'manage_options',
            'alef-school',
            array($this, 'admin_page'),
            'dashicons-groups',
            30
        );
        
        add_submenu_page(
            'alef-school',
            'التسجيلات',
            'التسجيلات',
            'manage_options',
            'alef-school',
            array($this, 'admin_page')
        );
        
        add_submenu_page(
            'alef-school',
            'الإعدادات',
            'الإعدادات',
            'manage_options',
            'alef-settings',
            array($this, 'settings_page')
        );
    }
    
    public function admin_page() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'alef_signups';
        
        $signups = $wpdb->get_results("SELECT * FROM $table_name ORDER BY signup_date DESC");
        
        echo '<div class="wrap">';
        echo '<h1>تسجيلات مدرسة ألف</h1>';
        echo '<p>استخدم الشورت كود <code>[alef_landing]</code> لعرض صفحة الهبوط في أي صفحة.</p>';
        
        if ($signups) {
            echo '<table class="wp-list-table widefat fixed striped">';
            echo '<thead><tr>';
            echo '<th>الاسم</th>';
            echo '<th>البريد الإلكتروني</th>';
            echo '<th>رقم الهاتف</th>';
            echo '<th>المدينة</th>';
            echo '<th>تاريخ التسجيل</th>';
            echo '</tr></thead>';
            echo '<tbody>';
            
            foreach ($signups as $signup) {
                echo '<tr>';
                echo '<td>' . esc_html($signup->name) . '</td>';
                echo '<td><a href="mailto:' . esc_attr($signup->email) . '">' . esc_html($signup->email) . '</a></td>';
                echo '<td><a href="tel:' . esc_attr($signup->phone) . '">' . esc_html($signup->phone) . '</a></td>';
                echo '<td>' . esc_html($signup->city) . '</td>';
                echo '<td>' . esc_html($signup->signup_date) . '</td>';
                echo '</tr>';
            }
            
            echo '</tbody></table>';
        } else {
            echo '<p>لا توجد تسجيلات حتى الآن.</p>';
        }
        
        echo '</div>';
    }
    
    public function settings_page() {
        if (isset($_POST['submit'])) {
            update_option('alef_google_sheets_url', sanitize_url($_POST['google_sheets_url']));
            update_option('alef_contact_phone', sanitize_text_field($_POST['contact_phone']));
            update_option('alef_contact_email', sanitize_email($_POST['contact_email']));
            echo '<div class="notice notice-success"><p>تم حفظ الإعدادات بنجاح!</p></div>';
        }
        
        $google_sheets_url = get_option('alef_google_sheets_url', '');
        $contact_phone = get_option('alef_contact_phone', '+972123456789');
        $contact_email = get_option('alef_contact_email', 'info@alefschool.com');
        
        echo '<div class="wrap">';
        echo '<h1>إعدادات مدرسة ألف</h1>';
        echo '<form method="post">';
        
        echo '<table class="form-table">';
        echo '<tr>';
        echo '<th scope="row">رابط Google Sheets</th>';
        echo '<td><input type="url" name="google_sheets_url" value="' . esc_attr($google_sheets_url) . '" class="regular-text" /></td>';
        echo '</tr>';
        
        echo '<tr>';
        echo '<th scope="row">رقم الهاتف</th>';
        echo '<td><input type="text" name="contact_phone" value="' . esc_attr($contact_phone) . '" class="regular-text" /></td>';
        echo '</tr>';
        
        echo '<tr>';
        echo '<th scope="row">البريد الإلكتروني</th>';
        echo '<td><input type="email" name="contact_email" value="' . esc_attr($contact_email) . '" class="regular-text" /></td>';
        echo '</tr>';
        echo '</table>';
        
        submit_button('حفظ الإعدادات');
        echo '</form>';
        echo '</div>';
    }
}

// Initialize the plugin
new AlefSchoolLanding();

?> 