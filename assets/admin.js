const form = document.getElementById("product-form");
let products = JSON.parse(localStorage.getItem("products")) || [];
const adminTable = document.getElementById("admin-table");

function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderAdminTable() {
  adminTable.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td><img src="${product.image}" width="50" alt="${product.name}" /></td>
      <td>
        <button class="btn btn-edit" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-delete" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    adminTable.appendChild(row);
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-category").value = product.category;
  document.getElementById("product-image").value = product.image;

  products.splice(index, 1);
  updateLocalStorage();
  renderAdminTable();
}

function deleteProduct(index) {
  if (confirm("هل تريد حذف هذا المنتج؟")) {
    products.splice(index, 1);
    updateLocalStorage();
    renderAdminTable();
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  // اجلب القيم من الحقول، لاحظ أن فئة المنتج الآن من select
  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value);
  const category = document.getElementById("product-category").value;
  const image = document.getElementById("product-image").value.trim();

  // تحقق من صحة البيانات (مثلاً، لا تسمح بالقيمة الفارغة في الفئة)
  if (!category) {
    alert("يرجى اختيار فئة المنتج.");
    return;
  }

  products.push({ name, price, category, image });
  updateLocalStorage();
  renderAdminTable();
  form.reset();

  // إعادة تعيين الخيار الافتراضي لقائمة الفئات
  document.getElementById("product-category").value = "";
});

renderAdminTable();
