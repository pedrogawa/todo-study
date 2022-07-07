export const showModal = () => {
  const modal = document.querySelector<HTMLElement>(
    ".add-todo-container-modal"
  );

  if (modal) {
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }
};
