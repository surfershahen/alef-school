<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="تعلم العبرية بطلاقة مع مدرسة ألف - أفضل طريقة لتعلم العبرية للناطقين بالعربية">
    <meta name="keywords" content="تعلم العبرية, دروس عبرية, مدرسة ألف, تعليم اللغة العبرية">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="مدرسة ألف - تعلم العبرية بطلاقة">
    <meta property="og:description" content="تعال جرّب الطريقة اللي خلت آلاف العرب يحكوا عبري بطلاقة وبسهولة">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/og-image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/jpeg" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.jpg">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Droid+Arabic+Kufi:wght@400;700;800&display=swap" rel="stylesheet">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="header">
    <div class="container">
        <div class="header-content">
            <div class="logo-container">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/alef-logo.jpg" 
                     alt="مدرسة ألف" 
                     class="logo">
            </div>
            
            <nav class="main-navigation">
                <ul class="nav-menu">
                    <li><a href="#signup">التسجيل</a></li>
                    <li><a href="#features">المميزات</a></li>
                    <li><a href="#testimonials">آراء الطلاب</a></li>
                    <li><a href="tel:+972123456789" class="contact-phone">اتصل بنا</a></li>
                </ul>
                
                <!-- Mobile Menu Button -->
                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </div>
    </div>
</header>

<style>
/* Mobile Menu Styles */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    margin: 3px 0;
    transition: 0.3s;
}

.contact-phone {
    background: var(--primary-blue);
    color: white !important;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
}

.contact-phone:hover {
    background: #0166a8;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    .nav-menu.active {
        display: flex;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    .main-navigation {
        position: relative;
    }
}
</style>

<script>
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-navigation');
    const menu = document.querySelector('.nav-menu');
    
    if (!nav.contains(e.target)) {
        menu.classList.remove('active');
    }
});
</script> 