function generateInvoiceContent(newOrder, payment, userInfo) {
  const invoiceContent = `
   <!DOCTYPE html>
  <html>
  
  <head>
    <style>
      body {
        background-color: #f7f7f7;
      }
  
      .invoice-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        font-family: Arial, sans-serif;
        background-color: white;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
  
      .invoice-header {
        margin-bottom: 20px;
      }
  
      .invoice-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 30px;
      }
  
      .invoice-item {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
      }
  
      .total-row {
        font-weight: bold;
        border-top: 1px solid #ddd;
        margin-top: 10px;
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
      }
    </style>
  </head>
  
  <body>
    <div class="invoice-container">
      <div class="invoice-header">
        <h1 style="color: #0066cc; margin: 0;">Invoice</h1>
      </div>
      <div class="invoice-details">
        <div>
          <strong>Company Name:</strong> xyz.com<br>
          <strong>Name:</strong> ${userInfo.user_name}<br>
          <strong>Email:</strong> ${userInfo.email}<br>
          <strong>Phone Number:</strong> ${userInfo.phone_number}
        </div>
        <div>
          <strong>Order No:</strong> ${newOrder.order_number}<br>
          <strong>Invoice No:</strong> ${userInfo.invoice_number}<br>
          <strong>Invoice Date:</strong> ${userInfo.invoice_date}
        </div>
      </div><br>
      <div class="invoice-item" style="background-color: #0066cc; color: white;">
        <div><strong>No.</strong></div>
        <div><strong>Plan Name</strong></div>
        <div><strong>Plan Limit</strong></div>
        <div><strong>Price</strong></div>
      </div>
      <div class="invoice-item">
        <div>1</div>
        <div>${newOrder.plan_name}</div>
        <div>${newOrder.plan_limit}</div>
        <div>$${payment.amount}</div>
      </div>
      <div class="total-row">
        <div><strong>Total Price:</strong></div>
        <div style="text-align: right;">$${payment.amount}</div>
      </div>
    </div>
  </body>
  
  </html>
  
      `;

  return invoiceContent;
}


module.exports = { generateInvoiceContent }