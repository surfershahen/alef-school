<?php
/**
 * ALEF School Theme Functions
 */

// Theme setup
function alef_school_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Set content width
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'alef_school_setup');

// Enqueue styles and scripts
function alef_school_scripts() {
    // Main theme stylesheet
    wp_enqueue_style('alef-school-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom JavaScript for form handling
    wp_enqueue_script('alef-school-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('alef-school-script', 'alef_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('alef_signup_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'alef_school_scripts');

// Handle form submission via AJAX
function alef_handle_signup_submission() {
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
    
    // Save to WordPress database
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
    
    // Send notification email
    alef_send_notification_email($name, $email, $phone, $city);
    
    // Send to Google Sheets (optional)
    alef_send_to_google_sheets($name, $email, $phone, $city);
    
    wp_die(json_encode(array('success' => true, 'message' => 'تم التسجيل بنجاح')));
}
add_action('wp_ajax_alef_signup_submit', 'alef_handle_signup_submission');
add_action('wp_ajax_nopriv_alef_signup_submit', 'alef_handle_signup_submission');

// Create database table on theme activation
function alef_create_signup_table() {
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
register_activation_hook(__FILE__, 'alef_create_signup_table');

// Send notification email
function alef_send_notification_email($name, $email, $phone, $city) {
    $to = get_option('admin_email'); // Send to site admin
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
    
    // Send confirmation email to user
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

// Send to Google Sheets (optional integration)
function alef_send_to_google_sheets($name, $email, $phone, $city) {
    // This function can be implemented to send data to Google Sheets
    // You would need to set up Google Sheets API credentials
    
    $google_sheets_url = get_option('alef_google_sheets_url');
    
    if (!empty($google_sheets_url)) {
        $data = array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'city' => $city,
            'date' => current_time('mysql')
        );
        
        wp_remote_post($google_sheets_url, array(
            'body' => json_encode($data),
            'headers' => array('Content-Type' => 'application/json'),
            'timeout' => 30
        ));
    }
}

// Add admin menu for viewing signups
function alef_admin_menu() {
    add_menu_page(
        'تسجيلات مدرسة ألف',
        'تسجيلات ألف',
        'manage_options',
        'alef-signups',
        'alef_signups_page',
        'dashicons-groups',
        30
    );
    
    add_submenu_page(
        'alef-signups',
        'إعدادات مدرسة ألف',
        'الإعدادات',
        'manage_options',
        'alef-settings',
        'alef_settings_page'
    );
}
add_action('admin_menu', 'alef_admin_menu');

// Admin page to view signups
function alef_signups_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'alef_signups';
    
    $signups = $wpdb->get_results("SELECT * FROM $table_name ORDER BY signup_date DESC");
    
    echo '<div class="wrap">';
    echo '<h1>تسجيلات مدرسة ألف</h1>';
    
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

// Settings page
function alef_settings_page() {
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

// Remove WordPress admin bar for non-admins
function alef_remove_admin_bar() {
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}
add_action('after_setup_theme', 'alef_remove_admin_bar');

// Custom body classes
function alef_body_classes($classes) {
    $classes[] = 'alef-school-theme';
    $classes[] = 'rtl-layout';
    return $classes;
}
add_filter('body_class', 'alef_body_classes');

// Disable WordPress comments completely
function alef_disable_comments() {
    // Close comments on the front-end
    add_filter('comments_open', '__return_false', 20, 2);
    add_filter('pings_open', '__return_false', 20, 2);
    
    // Hide existing comments
    add_filter('comments_array', '__return_empty_array', 10, 2);
    
    // Remove comments page in menu
    add_action('admin_menu', function() {
        remove_menu_page('edit-comments.php');
    });
    
    // Remove comments links from admin bar
    add_action('init', function() {
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    });
}
add_action('init', 'alef_disable_comments');

?> 