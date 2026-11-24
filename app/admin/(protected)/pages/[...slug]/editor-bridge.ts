// Plain JS source embedded as an inline <script> inside the iframe's srcDoc
// document (app/admin/(protected)/pages/[...slug]/page.tsx) - it runs in the
// preview iframe, not as part of the Next.js client bundle, so it can't be a
// normal module import there. Finds every [data-edit-id] element, makes text
// nodes click-to-edit (contenteditable) and images click-to-replace, and
// reports changes to the parent admin page via postMessage.
export const EDITOR_BRIDGE_SCRIPT = `
(function () {
  function editables() {
    return Array.prototype.slice.call(document.querySelectorAll("[data-edit-id]"));
  }

  editables().forEach(function (el) {
    el.style.outlineOffset = "2px";
    el.addEventListener("mouseenter", function () {
      if (!el.isContentEditable) el.style.outline = "1px dashed #2563eb";
    });
    el.addEventListener("mouseleave", function () {
      if (!el.isContentEditable) el.style.outline = "";
    });

    if (el.tagName === "IMG") {
      el.style.cursor = "pointer";
      el.addEventListener("click", function (e) {
        e.preventDefault();
        window.parent.postMessage(
          { type: "edit-image-click", editId: el.getAttribute("data-edit-id") },
          "*"
        );
      });
      return;
    }

    el.addEventListener("click", function (e) {
      if (el.isContentEditable) return;
      e.preventDefault();
      el.setAttribute("contenteditable", "true");
      el.style.outline = "2px solid #2563eb";
      el.focus();
    });
    el.addEventListener("blur", function () {
      el.style.outline = "";
      window.parent.postMessage(
        { type: "edit-text-changed", editId: el.getAttribute("data-edit-id"), value: el.textContent },
        "*"
      );
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && el.tagName !== "LI") {
        e.preventDefault();
        el.blur();
      }
    });
  });

  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "set-image-src" && e.data.editId) {
      var el = document.querySelector('[data-edit-id="' + e.data.editId + '"]');
      if (el) el.setAttribute("src", e.data.url);
    }
  });
})();
`;
