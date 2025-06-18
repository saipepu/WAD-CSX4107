function calculate() {
  const p = $('#basePrice').val();
  console.log('Base Price', p);
  const vatRate = 7;
  const vat = (p * vatRate) / 100;
  console.log('VAT', vat);
  const total = parseFloat(p) + vat;
  console.log('Total Price', total);

  $('#result').html(`
        <p>Base Price: ${p}</p>
        <p>VAT (7%): ${vat.toFixed(2)}</p>
        <p>Total Price: ${total.toFixed(2)}</p>
    `);
}
