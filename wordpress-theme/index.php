<?php
/**
 * ALEF School Landing Page Theme
 * Main template file
 */

get_header(); ?>

<main id="main" class="site-main">
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="title-font">
                        بتحلم تحكي عبري
                        <span class="highlight">بطلاقة وب - ستايل ؟</span>
                    </h1>
                    <p class="body-font">
                        تعال جرّب الطريقة اللي خلت آلاف العرب يحكوا عبري بطلاقة وبسهولة...
                        بدون ضغط، بدون ملل، بس نتائج حقيقية 👌.
                    </p>
                    <a href="#signup" class="cta-button scroll-to-form">
                        بدي احكي بطلاقة
                        <span>←</span>
                    </a>
                </div>
                <div class="hero-video">
                    <div class="video-container">
                        <div class="video-placeholder" id="video-placeholder">
                            <div class="play-button" onclick="playVideo()">
                                <span style="font-size: 2rem;">▶</span>
                            </div>
                            <video id="hero-video" style="display: none;" controls>
                                <source src="<?php echo get_template_directory_uri(); ?>/assets/videos/about-us.mp4" type="video/mp4">
                                متصفحك لا يدعم تشغيل الفيديو.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Signup Form Section -->
    <section id="signup" class="form-section">
        <div class="container">
            <div class="form-container">
                <div class="form-content">
                    <h2 class="title-font">سجل للحصول على تقييم مجاني</h2>
                    
                    <div id="success-message" class="success-message" style="display: none;">
                        <div class="success-icon">✓</div>
                        <h3>تم التسجيل بنجاح!</h3>
                        <p>شكراً لتسجيلك! سنتواصل معك قريباً عبر الواتساب.</p>
                    </div>

                    <form id="signup-form" method="post" action="<?php echo admin_url('admin-ajax.php'); ?>">
                        <?php wp_nonce_field('alef_signup_nonce', 'signup_nonce'); ?>
                        <input type="hidden" name="action" value="alef_signup_submit">
                        
                        <div class="form-group">
                            <label for="name">الاسم الكامل</label>
                            <input type="text" id="name" name="name" required placeholder="أدخل اسمك الكامل">
                            <div class="error-message" id="name-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="email">البريد الإلكتروني</label>
                            <input type="email" id="email" name="email" required placeholder="أدخل بريدك الإلكتروني">
                            <div class="error-message" id="email-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="phone">رقم الهاتف</label>
                            <input type="tel" id="phone" name="phone" required placeholder="أدخل رقم هاتفك">
                            <div class="error-message" id="phone-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="city">المدينة</label>
                            <input type="text" id="city" name="city" required placeholder="أدخل اسم مدينتك">
                            <div class="error-message" id="city-error"></div>
                        </div>

                        <button type="submit" class="submit-button" id="submit-btn">
                            سجل الآن - مجاناً
                        </button>
                        
                        <div class="error-message" id="form-error"></div>
                    </form>
                </div>

                <div class="form-benefits">
                    <h3>ماذا ستحصل عليه؟</h3>
                    <ul class="benefits-list">
                        <li>تقييم مجاني لمستواك في العبرية</li>
                        <li>خطة تعلم شخصية مصممة خصيصاً لك</li>
                        <li>جلسة استشارة مجانية مع خبير</li>
                        <li>وصول لمجتمع المتعلمين العرب</li>
                        <li>مواد تعليمية حصرية</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <h2 class="title-font" style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">
                لماذا مدرسة ألف؟
            </h2>
            <p style="text-align: center; font-size: 1.25rem; color: var(--gray-700); margin-bottom: 3rem;">
                نحن نقدم تجربة تعلم فريدة ومبتكرة
            </p>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">تعلم مخصص</h3>
                    <p>برنامج تعليمي مصمم خصيصاً حسب مستواك وأهدافك الشخصية</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">👥</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">مدرسين خبراء</h3>
                    <p>فريق من المدرسين المتخصصين في تعليم العبرية للناطقين بالعربية</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">نتائج سريعة</h3>
                    <p>طريقة مثبتة علمياً تضمن تحسن ملحوظ في أسابيع قليلة</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">تعلم مرن</h3>
                    <p>ادرس في أي وقت ومن أي مكان عبر منصتنا التفاعلية</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🏆</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">شهادات معتمدة</h3>
                    <p>احصل على شهادات معتمدة تساعدك في العمل والدراسة</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <h3 class="title-font" style="font-size: 1.5rem; margin-bottom: 1rem;">ممارسة حية</h3>
                    <p>جلسات محادثة مباشرة مع متحدثين أصليين للعبرية</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <div class="container">
            <h2 class="title-font" style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">
                ماذا يقول طلابنا؟
            </h2>
            <p style="text-align: center; font-size: 1.25rem; color: var(--gray-700); margin-bottom: 3rem;">
                آلاف الطلاب حققوا أهدافهم معنا
            </p>
            
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        "بعد 3 شهور مع مدرسة ألف، صرت أحكي عبري بطلاقة في الشغل. الطريقة سهلة ومفهومة والمدرسين رائعين!"
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div class="author-info">
                            <h4>أحمد محمد</h4>
                            <p>مهندس برمجيات - تل أبيب</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        "كنت خايفة من تعلم العبرية، بس مع ألف صار الموضوع ممتع وسهل. النتائج فاقت توقعاتي بكثير!"
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div class="author-info">
                            <h4>فاطمة أحمد</h4>
                            <p>طبيبة - القدس</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        "الشهادة اللي حصلت عليها من ألف ساعدتني أحصل على ترقية في الشغل. شكراً للفريق الرائع!"
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div class="author-info">
                            <h4>محمد علي</h4>
                            <p>محاسب - حيفا</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="hero-section" style="padding: 4rem 0;">
        <div class="container">
            <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                <h2 class="title-font" style="font-size: 2.5rem; margin-bottom: 1.5rem;">
                    جاهز تبدأ رحلتك في تعلم العبرية؟
                </h2>
                <p style="font-size: 1.25rem; color: var(--gray-700); margin-bottom: 2rem;">
                    انضم لآلاف الطلاب الذين حققوا أهدافهم معنا
                </p>
                <a href="#signup" class="cta-button scroll-to-form" style="font-size: 1.25rem; padding: 1.25rem 2.5rem;">
                    ابدأ التعلم الآن - مجاناً
                    <span>←</span>
                </a>
            </div>
        </div>
    </section>

</main>

<script>
// Video play functionality
function playVideo() {
    const placeholder = document.getElementById('video-placeholder');
    const video = document.getElementById('hero-video');
    
    placeholder.style.display = 'none';
    video.style.display = 'block';
    video.play();
}

// Smooth scroll to form
document.querySelectorAll('.scroll-to-form').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const formError = document.getElementById('form-error');
    const successMessage = document.getElementById('success-message');
    const form = this;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate form
    let isValid = true;
    const formData = new FormData(form);
    
    if (!formData.get('name').trim()) {
        document.getElementById('name-error').textContent = 'الاسم مطلوب';
        isValid = false;
    }
    
    if (!formData.get('email').trim()) {
        document.getElementById('email-error').textContent = 'البريد الإلكتروني مطلوب';
        isValid = false;
    }
    
    if (!formData.get('phone').trim()) {
        document.getElementById('phone-error').textContent = 'رقم الهاتف مطلوب';
        isValid = false;
    }
    
    if (!formData.get('city').trim()) {
        document.getElementById('city-error').textContent = 'المدينة مطلوبة';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Submit form
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
        } else {
            formError.textContent = data.message || 'حدث خطأ أثناء الإرسال';
        }
    })
    .catch(error => {
        formError.textContent = 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'سجل الآن - مجاناً';
    });
});
</script>

<?php get_footer(); ?> 