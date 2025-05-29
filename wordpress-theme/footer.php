<footer class="site-footer" style="background: var(--text-dark); color: white; padding: 3rem 0 1rem;">
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            
            <!-- Company Info -->
            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/alef-logo.jpg" 
                     alt="مدرسة ألف" 
                     style="height: 60px; margin-bottom: 1rem;">
                <p style="color: #ccc; line-height: 1.6;">
                    مدرسة ألف هي الوجهة الأولى لتعلم العبرية للناطقين بالعربية. 
                    نقدم تجربة تعليمية فريدة ومبتكرة تضمن النجاح.
                </p>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h3 style="margin-bottom: 1rem; color: white;">روابط سريعة</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;">
                        <a href="#signup" style="color: #ccc; text-decoration: none;">التسجيل</a>
                    </li>
                    <li style="margin-bottom: 0.5rem;">
                        <a href="#features" style="color: #ccc; text-decoration: none;">المميزات</a>
                    </li>
                    <li style="margin-bottom: 0.5rem;">
                        <a href="#testimonials" style="color: #ccc; text-decoration: none;">آراء الطلاب</a>
                    </li>
                    <li style="margin-bottom: 0.5rem;">
                        <a href="<?php echo home_url('/privacy-policy'); ?>" style="color: #ccc; text-decoration: none;">سياسة الخصوصية</a>
                    </li>
                </ul>
            </div>
            
            <!-- Contact Info -->
            <div>
                <h3 style="margin-bottom: 1rem; color: white;">تواصل معنا</h3>
                <div style="color: #ccc;">
                    <p style="margin-bottom: 0.5rem;">
                        📞 <a href="tel:+972123456789" style="color: #ccc; text-decoration: none;">+972-12-345-6789</a>
                    </p>
                    <p style="margin-bottom: 0.5rem;">
                        📧 <a href="mailto:info@alefschool.com" style="color: #ccc; text-decoration: none;">info@alefschool.com</a>
                    </p>
                    <p style="margin-bottom: 0.5rem;">
                        💬 <a href="https://wa.me/972123456789" style="color: #ccc; text-decoration: none;" target="_blank">واتساب</a>
                    </p>
                    <p style="margin-bottom: 0.5rem;">
                        📍 تل أبيب، إسرائيل
                    </p>
                </div>
            </div>
            
            <!-- Social Media -->
            <div>
                <h3 style="margin-bottom: 1rem; color: white;">تابعنا</h3>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" style="color: #ccc; font-size: 1.5rem; text-decoration: none;" title="فيسبوك">📘</a>
                    <a href="#" style="color: #ccc; font-size: 1.5rem; text-decoration: none;" title="إنستغرام">📷</a>
                    <a href="#" style="color: #ccc; font-size: 1.5rem; text-decoration: none;" title="يوتيوب">📺</a>
                    <a href="#" style="color: #ccc; font-size: 1.5rem; text-decoration: none;" title="تيك توك">🎵</a>
                </div>
            </div>
        </div>
        
        <!-- Copyright -->
        <div style="border-top: 1px solid #444; padding-top: 1rem; text-align: center; color: #ccc;">
            <p>&copy; <?php echo date('Y'); ?> مدرسة ألف. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</footer>

<!-- Back to Top Button -->
<button id="back-to-top" style="
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    font-size: 1.2rem;
" onclick="scrollToTop()">↑</button>

<script>
// Back to top functionality
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
</script>

<?php wp_footer(); ?>
</body>
</html> 