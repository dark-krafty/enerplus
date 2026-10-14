// Wait for the full DOM hierarchy to render cleanly
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksList = document.getElementById('nav-list');

    if (mobileMenuBtn && navLinksList) {
        // Toggle Mobile Navigation Drawer Visibility State
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');

            // Simple accessibility attribute adjustment
            const isExpanded = navLinksList.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isExpanded));
        });

        // Auto-close mobile drawer menu panel when an active link is chosen
        const links = navLinksList.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const chatPopover = document.getElementById('chatPopover');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatStatus = document.getElementById('chatMessageStatus');
    let chatLauncher = document.getElementById('chatLauncher');

    if (chatPopover && !chatLauncher) {
        chatLauncher = document.createElement('button');
        chatLauncher.id = 'chatLauncher';
        chatLauncher.type = 'button';
        chatLauncher.className = 'chat-launcher';
        chatLauncher.setAttribute('aria-label', 'Open chat');
        chatLauncher.textContent = 'Chat with us';
        document.body.appendChild(chatLauncher);
    }

    const setChatVisibility = (show) => {
        if (!chatPopover) return;
        chatPopover.setAttribute('aria-hidden', String(!show));
        chatPopover.style.display = show ? 'block' : 'none';
    };

    if (chatLauncher && chatPopover) {
        chatLauncher.addEventListener('click', () => {
            const isHidden = chatPopover.getAttribute('aria-hidden') === 'true';
            setChatVisibility(isHidden);
        });
    }

    if (chatClose && chatPopover) {
        chatClose.addEventListener('click', () => setChatVisibility(false));
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('chatName')?.value.trim() || 'Customer';
            const email = document.getElementById('chatEmail')?.value.trim() || '';
            const message = document.getElementById('chatMessage')?.value.trim() || '';

            if (!email || !message) {
                if (chatStatus) {
                    chatStatus.hidden = false;
                    chatStatus.textContent = 'Please complete all fields and try again.';
                }
                return;
            }

            const subject = encodeURIComponent(`Website inquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:info@enerplusresources.com?subject=${subject}&body=${body}`;

            if (chatStatus) {
                chatStatus.hidden = false;
                chatStatus.textContent = `Thanks, ${name}. Your email app should open with a draft to info@enerplusresources.com.`;
            }

            chatForm.reset();
            setChatVisibility(false);
        });
    }
});

// Instant Search Filter Logic for the Careers Page
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('job-search');
    const jobsContainer = document.getElementById('open-roles');
    
    if (!searchBar || !jobsContainer) return; // Prevent errors if loaded on non-career pages

    const jobRows = jobsContainer.querySelectorAll('.job-row');

    searchBar.addEventListener('input', (e) => {
        const queryText = e.target.value.toLowerCase().trim();

        jobRows.forEach(row => {
            const titleAttr = row.getAttribute('data-title') || '';
            const teamAttr = row.getAttribute('data-team') || '';
            const locAttr = row.getAttribute('data-location') || '';

            // Check if input keyword matches any row metadata parameters
            if (titleAttr.includes(queryText) || teamAttr.includes(queryText) || locAttr.includes(queryText)) {
                row.style.display = 'flex'; // Make the element visible if matched
            } else {
                row.style.display = 'none'; // Hide elements that don't match
            }
        });
    });
});

// Product Catalog Category Filtration Event Handling Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productContainer = document.getElementById('product-container');

    if (!filterButtons.length || !productContainer) return; // Halt safely on alternative pages

    const productCards = productContainer.querySelectorAll('.ops-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selection state visual anchors from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Highlight current target button node
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            productCards.forEach(card => {
                const targetCategory = card.getAttribute('data-category');

                // Determine layout calculation behavior settings
                if (selectedCategory === 'all' || selectedCategory === targetCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
