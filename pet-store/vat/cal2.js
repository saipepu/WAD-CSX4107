function calculate() {
  const p = $('#basePrice').val();
  console.log('Base Price', p);
  const vatRate = 7;
  const vat = (p / (100 + vatRate)) * vatRate;
  console.log('VAT', vat);
  const total = parseFloat(p) + vat;
  console.log('Total Price', total);

  $('#result').html(`
        ${total.toFixed(2)}
    `);
}

// <p>Base Price: ${p}</p>
//<p>VAT (7%): ${vat.toFixed(2)}</p>
