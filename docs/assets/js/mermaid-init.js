(function () {
  function renderMermaid() {
    if (!window.mermaid) return;

    // Lebih aman gunakan 'strict'. Pakai 'loose' hanya jika Anda butuh HTML/link tertentu di diagram.
    window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });

    // Mermaid v10+
    if (typeof window.mermaid.run === "function") {
      window.mermaid.run({ querySelector: ".mermaid" });
    } else {
      // Fallback v8/v9
      window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    }
  }

  // Render saat halaman pertama kali dimuat
  renderMermaid();

  // Render ulang setelah navigasi instan (Material SPA)
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(renderMermaid);
  } else {
    document.addEventListener("DOMContentLoaded", renderMermaid);
  }
})();
