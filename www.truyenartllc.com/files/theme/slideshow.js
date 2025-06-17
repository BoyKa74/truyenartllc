document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.slideshow-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const scrollAmount = 300; // Khoảng cách cuộn mỗi lần nhấn
    let isScrolling = false;
    let scrollTimeout;
    
    // Hiển thị tất cả các hình ảnh
    const slides = document.querySelectorAll('.slideshow-image');
    slides.forEach(slide => {
        slide.style.display = 'inline-block';
    });
    
    // Thêm sự kiện cho nút prev (cuộn sang trái)
    prevButton.addEventListener('click', function() {
        // Nếu đã ở gần đầu, quay lại cuối
        if (container.scrollLeft < scrollAmount) {
            container.scrollTo({
                left: container.scrollWidth,
                behavior: 'smooth'
            });
        } else {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    // Thêm sự kiện cho nút next (cuộn sang phải)
    nextButton.addEventListener('click', function() {
        // Nếu đã ở gần cuối, quay lại đầu
        if (container.scrollLeft + container.clientWidth + scrollAmount >= container.scrollWidth) {
            container.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    // Xử lý sự kiện khi người dùng cuộn
    container.addEventListener('scroll', function() {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            checkScrollPosition();
        }, 150);
    });
    
    // Thêm sự kiện wheel để bắt cuộn chuột
    container.addEventListener('wheel', function(e) {
        e.preventDefault(); // Ngăn cuộn trang
        
        const delta = Math.sign(e.deltaY) * scrollAmount / 2;
        
        // Nếu cuộn đến cuối và vẫn cuộn tiếp
        if (delta > 0 && container.scrollLeft + container.clientWidth + delta >= container.scrollWidth) {
            container.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } 
        // Nếu cuộn đến đầu và vẫn cuộn ngược
        else if (delta < 0 && container.scrollLeft + delta <= 0) {
            container.scrollTo({
                left: container.scrollWidth,
                behavior: 'smooth'
            });
        } 
        // Cuộn bình thường
        else {
            container.scrollBy({
                left: delta,
                behavior: 'smooth'
            });
        }
    });
    
    // Thêm hỗ trợ cảm ứng
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > 50) { // Ngưỡng vuốt tối thiểu
            if (swipeDistance > 0) { // Vuốt sang trái (tiếp theo)
                // Nếu đã ở gần cuối, quay lại đầu
                if (container.scrollLeft + container.clientWidth + scrollAmount >= container.scrollWidth) {
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            } else { // Vuốt sang phải (trước)
                // Nếu đã ở gần đầu, quay lại cuối
                if (container.scrollLeft < scrollAmount) {
                    container.scrollTo({
                        left: container.scrollWidth,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    // Kiểm tra vị trí cuộn và xử lý quay vòng nếu cần
    function checkScrollPosition() {
        if (!isScrolling) {
            // Nếu cuộn đến cuối hoặc gần cuối
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
                // Không quay lại đầu ngay lập tức nhưng hiển thị gợi ý
                // Có thể thêm hiệu ứng gợi ý ở đây nếu muốn
            }
            
            // Nếu cuộn đến đầu hoặc gần đầu
            if (container.scrollLeft <= 20) {
                // Không quay lại cuối ngay lập tức nhưng hiển thị gợi ý
                // Có thể thêm hiệu ứng gợi ý ở đây nếu muốn
            }
        }
    }
}); 