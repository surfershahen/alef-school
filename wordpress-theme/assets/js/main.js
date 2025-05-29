/**
 * ALEF School Theme JavaScript
 */

jQuery(document).ready(function ($) {
  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800
      );
    }
  });

  // Back to top button
  var backToTop = $("#back-to-top");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });

  backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  // Mobile menu toggle
  $(".mobile-menu-toggle").on("click", function () {
    $(".nav-menu").toggleClass("active");
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".main-navigation").length) {
      $(".nav-menu").removeClass("active");
    }
  });

  // Video play functionality
  window.playVideo = function () {
    var placeholder = $("#video-placeholder");
    var video = $("#hero-video");

    placeholder.hide();
    video.show();
    video[0].play();
  };

  // Form submission with AJAX
  $("#signup-form").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var submitBtn = $("#submit-btn");
    var formError = $("#form-error");
    var successMessage = $("#success-message");

    // Clear previous errors
    $(".error-message").text("");

    // Validate form
    var isValid = true;
    var formData = new FormData(this);

    if (!formData.get("name").trim()) {
      $("#name-error").text("الاسم مطلوب");
      isValid = false;
    }

    if (!formData.get("email").trim()) {
      $("#email-error").text("البريد الإلكتروني مطلوب");
      isValid = false;
    } else if (!isValidEmail(formData.get("email"))) {
      $("#email-error").text("البريد الإلكتروني غير صحيح");
      isValid = false;
    }

    if (!formData.get("phone").trim()) {
      $("#phone-error").text("رقم الهاتف مطلوب");
      isValid = false;
    }

    if (!formData.get("city").trim()) {
      $("#city-error").text("المدينة مطلوبة");
      isValid = false;
    }

    if (!isValid) return;

    // Submit form
    submitBtn.prop("disabled", true).text("جاري الإرسال...");

    $.ajax({
      url: alef_ajax.ajax_url,
      type: "POST",
      data: {
        action: "alef_signup_submit",
        signup_nonce: alef_ajax.nonce,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        city: formData.get("city"),
      },
      success: function (response) {
        var data = JSON.parse(response);
        if (data.success) {
          form.hide();
          successMessage.show();

          // Scroll to success message
          $("html, body").animate(
            {
              scrollTop: successMessage.offset().top - 100,
            },
            800
          );
        } else {
          formError.text(data.message || "حدث خطأ أثناء الإرسال");
        }
      },
      error: function () {
        formError.text("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      },
      complete: function () {
        submitBtn.prop("disabled", false).text("سجل الآن - مجاناً");
      },
    });
  });

  // Email validation function
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Animate elements on scroll
  function animateOnScroll() {
    $(".feature-card, .testimonial-card").each(function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("animate-in");
      }
    });
  }

  // Run animation on scroll
  $(window).on("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Add CSS for animations
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
            .feature-card, .testimonial-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .feature-card.animate-in, .testimonial-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hero-section {
                animation: fadeInUp 1s ease-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `
    )
    .appendTo("head");

  // Form field focus effects
  $("input")
    .on("focus", function () {
      $(this).parent().addClass("focused");
    })
    .on("blur", function () {
      if (!$(this).val()) {
        $(this).parent().removeClass("focused");
      }
    });

  // Add loading spinner CSS
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
            .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid var(--primary-blue);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-left: 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .form-group.focused label {
                color: var(--primary-blue);
            }
            
            .form-group.focused input {
                border-color: var(--primary-blue);
                box-shadow: 0 0 0 3px rgba(1, 136, 214, 0.1);
            }
        `
    )
    .appendTo("head");

  // Add success animation
  function showSuccessAnimation() {
    var successIcon = $(".success-icon");
    successIcon.css({
      transform: "scale(0)",
      transition: "transform 0.5s ease",
    });

    setTimeout(function () {
      successIcon.css("transform", "scale(1)");
    }, 100);
  }

  // Call success animation when success message is shown
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        var target = $(mutation.target);
        if (target.is("#success-message") && target.is(":visible")) {
          showSuccessAnimation();
        }
      }
    });
  });

  if ($("#success-message").length) {
    observer.observe($("#success-message")[0], {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  // Lazy loading for images
  $("img").each(function () {
    var img = $(this);
    var src = img.attr("src");

    if (src) {
      img.on("load", function () {
        img.addClass("loaded");
      });
    }
  });

  // Add image loading CSS
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
            img {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            img.loaded {
                opacity: 1;
            }
        `
    )
    .appendTo("head");
});

// Global functions
window.scrollToForm = function () {
  jQuery("html, body").animate(
    {
      scrollTop: jQuery("#signup").offset().top - 80,
    },
    800
  );
};

window.toggleMobileMenu = function () {
  jQuery(".nav-menu").toggleClass("active");
};

window.scrollToTop = function () {
  jQuery("html, body").animate({ scrollTop: 0 }, 800);
};
