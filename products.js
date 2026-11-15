/* Productcatalogus voor de winkel van RGJMAXSTUDIO79.
   Voeg later echte producten toe in products.json (en eventueel hieronder).
   Velden: id, name, description, image (pad of URL), priceLabel, paypalUrl, placeholder.
   Laat paypalUrl leeg tot er een echte betaallink is. */
window.RGJ_PRODUCTS = [
  {
    id: "placeholder-1",
    name: "Voorbeeldproduct",
    description: "Dit is een voorbeeldkaart. Echte producten kunnen later hier worden toegevoegd.",
    image: null,
    priceLabel: "Prijs volgt",
    paypalUrl: null,
    placeholder: true
  },
  {
    id: "placeholder-2",
    name: "Voorbeeldproduct",
    description: "Dit is een voorbeeldkaart. Echte producten kunnen later hier worden toegevoegd.",
    image: null,
    priceLabel: "Prijs volgt",
    paypalUrl: null,
    placeholder: true
  },
  {
    id: "placeholder-3",
    name: "Voorbeeldproduct",
    description: "Dit is een voorbeeldkaart. Echte producten kunnen later hier worden toegevoegd.",
    image: null,
    priceLabel: "Prijs volgt",
    paypalUrl: null,
    placeholder: true
  }
];

(function () {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render(products) {
    if (!Array.isArray(products) || !products.length) {
      grid.innerHTML = "<p>Er zijn nog geen producten toegevoegd.</p>";
      return;
    }

    grid.innerHTML = products
      .map(function (product) {
        const name = escapeHtml(product.name || "Product");
        const description = escapeHtml(product.description || "");
        const price = escapeHtml(product.priceLabel || "Prijs volgt");
        const badge = product.placeholder
          ? '<p class="product-badge">Voorbeeld</p>'
          : "";
        const media = product.image
          ? '<div class="product-media"><img src="' +
            escapeHtml(product.image) +
            '" alt=""></div>'
          : '<div class="product-media" aria-hidden="true">Afbeelding volgt</div>';
        const button =
          product.paypalUrl && !product.placeholder
            ? '<a class="btn btn-gold" href="' +
              escapeHtml(product.paypalUrl) +
              '" rel="noopener noreferrer">Bestellen</a>'
            : "";

        return (
          '<article class="product-card">' +
          badge +
          media +
          "<h3>" +
          name +
          "</h3>" +
          '<p class="product-desc">' +
          description +
          "</p>" +
          '<p class="product-price">' +
          price +
          "</p>" +
          button +
          "</article>"
        );
      })
      .join("");
  }

  fetch("products.json", { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("catalogus niet geladen");
      return response.json();
    })
    .then(render)
    .catch(function () {
      render(window.RGJ_PRODUCTS);
    });
})();
