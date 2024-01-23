export const dropAlert = () => {
  const alert = document.querySelector(".alert");
  if (alert) {
    alert.parentElement.removeChild(alert);
  }
};

export const displayAlert = (status, message) => {
  dropAlert();
  const box =
    status == "success"
      ? `<div class="alert alert-success" role="alert">
  ${message}
</div>`
      : `<div class="alert alert-danger" role="alert">
${message}
</div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", box);
  window.setTimeout(dropAlert, 5000);
};
