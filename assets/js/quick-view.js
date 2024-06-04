if (!customElements.get('quick-view-modal')) {
    customElements.define('quick-view-modal', class QuickViewModal extends HTMLElement {
        constructor() {
            super();
            // Reference elements in the light DOM (to be assigned later)
            this.modal = null;
            this.openButton = null;
            this.closeBtn = null;
            this.loading = null;
            this.prodSlug = null;

            // Observer for detecting when the element is added to the DOM
            this.observer = new MutationObserver(this.init.bind(this));
            this.observer.observe(document.body, { childList: true, subtree: true });
        }

        init() {
            // Reference the modal and its components in the light DOM
            this.modal = this.querySelector('.quick-view');
            this.closeBtn = this.querySelector('.quickModalClose');
            this.loading = this.querySelector('#spinloader');

            // Find all open buttons and add click event listeners
            this.openButtons = document.querySelectorAll(".quick-view-btn");

            this.openButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();

                    this.prodSlug = event.target.getAttribute("data-slug");
                    this.openModal();
                });
            });

            this.closeBtn.addEventListener("click", this.closeModal.bind(this));

            // Disconnect the observer since elements are now found
            this.observer.disconnect();
        }

        openModal() {
            this.modal.classList.add("open");
            this.fetchProductData(this.prodSlug);
        }

        closeModal(event) {
            event.preventDefault();
            this.modal.classList.remove("open");
        }


        async fetchProductData(prodSlug) {

            this.loading.classList.remove('hidden');
            this.loading.classList.add('spin-wrapper');

            const component = {
                id: 'quick-view',
                selector: '.quick-view-wrapper'
            };

            const data = {
                components: JSON.stringify([component.id]),
                slug: prodSlug
            };

            const config = fetchConfig();
            config.body = JSON.stringify(data);

            try {
                const response = await fetch(`${routes.quick_view}`, config);
                const responseData = await response.json();

                if (responseData && responseData.components && responseData.components[component.id]) {
                    renderComponents(component.selector, responseData.components[component.id]);
                } else {
                    console.error('Component data not found in response:', responseData);
                }

                this.loading.classList.add('hidden');
                this.loading.classList.remove('spin-wrapper');
            } catch (e) {
                console.error(e);
            }
        }
    })
}