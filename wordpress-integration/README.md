# ALEF SCHOOL - WordPress Integration Guide

This guide provides multiple approaches to integrate your React-based ALEF SCHOOL landing page into WordPress.

## 🎯 Recommended Approach: Custom WordPress Theme

### Option 1: Complete WordPress Theme (Recommended)

**Pros:**

- Native WordPress integration
- Better SEO performance
- Easy content management
- No complex build processes
- WordPress admin integration

**Steps:**

1. Copy the `wordpress-theme/` folder to your WordPress `wp-content/themes/` directory
2. Activate the "ALEF School" theme in WordPress admin
3. The landing page will be your homepage
4. Forms will integrate with WordPress database

### Option 2: WordPress Plugin

**Pros:**

- Works with any theme
- Easy to activate/deactivate
- Portable across WordPress sites

**Steps:**

1. Copy the `wordpress-plugin/` folder to your WordPress `wp-content/plugins/` directory
2. Activate the "ALEF School Landing" plugin
3. Use shortcode `[alef_landing]` on any page
4. Or set as homepage in plugin settings

### Option 3: Page Template

**Pros:**

- Minimal integration
- Works with existing themes
- Quick implementation

**Steps:**

1. Copy `page-templates/landing-page.php` to your active theme folder
2. Create a new page in WordPress admin
3. Select "Landing Page" template
4. Publish the page

## 🔧 Technical Requirements

- WordPress 5.0+
- PHP 7.4+
- Modern browser support
- SSL certificate (recommended for forms)

## 🎨 Customization

### Colors & Branding

Edit the CSS variables in `assets/style.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Content

- Edit text content in the PHP template files
- Replace images in the `assets/images/` folder
- Modify form fields in the form handling files

### Forms Integration

The forms are set up to work with:

- WordPress database (default)
- Google Sheets (requires API setup)
- Email notifications

## 📱 Features Included

- ✅ Responsive design
- ✅ RTL (Arabic) support
- ✅ Contact forms
- ✅ Testimonials section
- ✅ Features showcase
- ✅ Call-to-action sections
- ✅ SEO optimized
- ✅ Fast loading

## 🚀 Going Live

1. Upload files to your WordPress installation
2. Activate theme/plugin
3. Test all forms and functionality
4. Configure any API integrations needed
5. Set up SSL certificate
6. Configure caching if needed

## 📞 Support

For technical support or customization requests, please refer to the documentation in each folder or contact your developer.
