# 🎯 ALEF School WordPress - Complete Step-by-Step Implementation Guide

## 🚀 OPTION 1: WordPress Theme Installation (RECOMMENDED)

### STEP 1: Prepare Your WordPress Site

1. **Access your WordPress hosting**

   - Log into your hosting control panel (cPanel, Plesk, etc.)
   - Or use FTP/SFTP client (FileZilla, WinSCP)

2. **Navigate to WordPress directory**
   ```
   /public_html/wp-content/themes/
   ```

### STEP 2: Upload Theme Files

1. **Create theme folder**

   - Create new folder: `alef-school-theme`
   - Full path: `/public_html/wp-content/themes/alef-school-theme/`

2. **Upload all theme files**

   ```
   alef-school-theme/
   ├── style.css
   ├── index.php
   ├── header.php
   ├── footer.php
   ├── functions.php
   └── assets/
       ├── images/
       │   ├── alef-logo.jpg
       │   └── favicon.jpg
       ├── videos/
       │   └── about-us.mp4
       └── js/
           └── main.js
   ```

3. **Set file permissions**
   - Folders: 755
   - Files: 644

### STEP 3: Activate Theme in WordPress

1. **Login to WordPress Admin**

   - Go to: `yoursite.com/wp-admin`
   - Enter your admin credentials

2. **Navigate to Themes**

   - Click: `Appearance` → `Themes`

3. **Activate ALEF School Theme**
   - Find "ALEF School Landing" theme
   - Click `Activate`

### STEP 4: Configure Database & Settings

1. **Check if database table was created**

   - The theme automatically creates `wp_alef_signups` table
   - If not working, deactivate and reactivate theme

2. **Access ALEF School Settings**

   - In WordPress admin, look for `تسجيلات ألف` in the menu
   - Click `الإعدادات` (Settings)

3. **Configure Contact Information**
   ```
   Phone: +972-XX-XXX-XXXX
   Email: info@yourschool.com
   Google Sheets URL: (optional)
   ```

### STEP 5: Upload Media Files

1. **Upload Logo**

   - Place your logo as: `assets/images/alef-logo.jpg`
   - Recommended size: 200x60px

2. **Upload Video**

   - Place video as: `assets/videos/about-us.mp4`
   - Recommended: MP4 format, max 50MB

3. **Upload Favicon**
   - Place favicon as: `assets/images/favicon.jpg`
   - Size: 32x32px or 16x16px

### STEP 6: Test Your Landing Page

1. **Visit your homepage**

   - Go to: `yoursite.com`
   - Check if landing page loads correctly

2. **Test form submission**

   - Fill out the signup form
   - Submit and check for success message
   - Verify email notifications

3. **Check admin panel**
   - Go to `تسجيلات ألف` → view submissions
   - Confirm data is being saved

---

## 🔌 OPTION 2: WordPress Plugin Installation (ALTERNATIVE)

### STEP 1: Upload Plugin Files

1. **Navigate to plugins directory**

   ```
   /public_html/wp-content/plugins/
   ```

2. **Create plugin folder**
   - Create: `alef-school-landing`
   - Upload all plugin files

### STEP 2: Activate Plugin

1. **Go to WordPress Admin**

   - Navigate: `Plugins` → `Installed Plugins`

2. **Activate Plugin**
   - Find "ALEF School Landing Page"
   - Click `Activate`

### STEP 3: Create Landing Page

1. **Create New Page**

   - Go to: `Pages` → `Add New`
   - Title: "الصفحة الرئيسية" or "Home"

2. **Add Shortcode**

   - In page content, add: `[alef_landing]`
   - Click `Publish`

3. **Set as Homepage**
   - Go to: `Settings` → `Reading`
   - Select "A static page"
   - Choose your landing page as homepage

---

## 🎨 CUSTOMIZATION STEPS

### STEP 1: Update Content

1. **Edit Text Content**

   - Open `index.php` in theme folder
   - Find Arabic text sections
   - Replace with your content

2. **Update Contact Information**
   - Edit phone numbers in header.php and footer.php
   - Update email addresses
   - Modify social media links

### STEP 2: Customize Colors

1. **Edit CSS Variables**
   - Open `style.css`
   - Find `:root` section
   - Modify color values:
   ```css
   :root {
     --primary-blue: #YOUR_BLUE;
     --primary-red: #YOUR_RED;
     --primary-yellow: #YOUR_YELLOW;
   }
   ```

### STEP 3: Replace Images

1. **Logo Replacement**

   - Replace `assets/images/alef-logo.jpg`
   - Keep same filename or update references

2. **Background Images**
   - Add any additional images to `assets/images/`
   - Update CSS references if needed

---

## 📧 EMAIL CONFIGURATION

### STEP 1: Test Email Functionality

1. **Check WordPress Email**

   - Install "WP Mail SMTP" plugin (recommended)
   - Configure SMTP settings

2. **Test Form Emails**
   - Submit test form
   - Check if emails are received

### STEP 2: Configure Google Sheets (Optional)

1. **Create Google Sheets API**

   - Go to Google Cloud Console
   - Create new project
   - Enable Sheets API
   - Create service account

2. **Add Webhook URL**
   - In ALEF settings, add your Google Sheets webhook URL
   - Test integration

---

## 🔒 SECURITY & PERFORMANCE

### STEP 1: Security Setup

1. **Install Security Plugin**

   - Recommended: Wordfence or Sucuri
   - Configure firewall settings

2. **SSL Certificate**
   - Ensure SSL is active
   - Update WordPress URL to https://

### STEP 2: Performance Optimization

1. **Install Caching Plugin**

   - Recommended: WP Rocket or W3 Total Cache
   - Configure caching settings

2. **Optimize Images**
   - Install image optimization plugin
   - Compress existing images

---

## ✅ FINAL TESTING CHECKLIST

### Functionality Tests

- [ ] Homepage loads correctly
- [ ] Form submission works
- [ ] Email notifications sent
- [ ] Admin panel shows submissions
- [ ] Mobile responsiveness
- [ ] Video playback works
- [ ] All links functional

### Performance Tests

- [ ] Page load speed < 3 seconds
- [ ] Images load properly
- [ ] No JavaScript errors
- [ ] CSS styles applied correctly

### SEO Tests

- [ ] Meta tags present
- [ ] Page title correct
- [ ] Description meta tag
- [ ] Open Graph tags
- [ ] Favicon displays

---

## 🚨 TROUBLESHOOTING

### Common Issues & Solutions

**Issue: Theme not appearing**

- Solution: Check file permissions (755 for folders, 644 for files)

**Issue: Form not submitting**

- Solution: Check if AJAX is working, verify nonce

**Issue: Emails not sending**

- Solution: Install WP Mail SMTP plugin

**Issue: Database errors**

- Solution: Deactivate and reactivate theme to recreate tables

**Issue: Arabic text not displaying**

- Solution: Ensure UTF-8 encoding in database

---

## 📞 SUPPORT RESOURCES

### WordPress Resources

- WordPress Codex: https://codex.wordpress.org/
- WordPress Support: https://wordpress.org/support/

### Hosting Support

- Contact your hosting provider for server-related issues
- Check hosting documentation for WordPress setup

---

## 🎉 LAUNCH CHECKLIST

### Pre-Launch

- [ ] All content reviewed and approved
- [ ] Forms tested thoroughly
- [ ] Email notifications working
- [ ] Mobile testing completed
- [ ] Performance optimized
- [ ] Security measures in place

### Post-Launch

- [ ] Monitor form submissions
- [ ] Check email deliverability
- [ ] Monitor site performance
- [ ] Set up analytics tracking
- [ ] Regular backups scheduled

---

**🚀 You're Ready to Launch!**

Follow these steps in order, and your ALEF School landing page will be live on WordPress with full functionality. Remember to test everything thoroughly before going live!
