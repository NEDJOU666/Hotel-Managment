import React from 'react';

const Invoices: React.FC<{ invoices: { id: number, details: string, amount: number, date: string, method: string, reference: string }[] }> = ({ invoices }) => {
  const getTotalAmount = () => {
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9', width: '100%', maxWidth: '600px', margin: 'auto', position: 'relative' }}>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Invoices</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMjEuNzU0NjkiIHkxPSI4LjY2ODI1IiB4Mj0iMTAuMDE0MDYiIHkyPSI0My4zNTI2MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzI3OGIxMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJkZDE4MCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNS40MjE4OCIgeTE9IjI0LjgzMDc1IiB4Mj0iMjIuNzA2MjUiIHkyPSIyNS43NDk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfVkxLYWZPa2szc0JYX2dyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMyI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC4wNzEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4yIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjMyMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjAuNjIzIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNC4wMTI1IiB5MT0iNy42MjQ1IiB4Mj0iMzYuOSIgeTI9IjQxLjk2MDQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfVkxLYWZPa2szc0JYX2dyMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjhmOWZhIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjZmODY0Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg1LjMzMzMzLDUuMzMzMzMpIj48cGF0aCBkPSJNMTcuNjM0LDZoMTEuMzA1bC0xMS43MzYsMzQuNzczYy0wLjI0NywwLjczMyAtMC45MzQsMS4yMjYgLTEuNzA4LDEuMjI2aC04Ljc5OGMtMC45OTQsMCAtMS44LC0wLjgwNiAtMS44LC0xLjhjMCwtMC4xOTYgMC4wMzIsLTAuMzkgMC4wOTQsLTAuNTc2bDEwLjkzNSwtMzIuMzk2YzAuMjQ3LC0wLjczMyAwLjkzNCwtMS4yMjcgMS43MDgsLTEuMjI3eiIgZmlsbD0idXJsKCNjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEpIj48L3BhdGg+PHBhdGggZD0iTTM0LjA2MiwyOS4zMjRoLTE3LjkyN2MtMC40NTgsLTAuMDAxIC0wLjgzLDAuMzcxIC0wLjgzMSwwLjgyOWMwLDAuMjMxIDAuMDk1LDAuNDUxIDAuMjY0LDAuNjA4bDExLjUyLDEwLjc1MmMwLjMzNSwwLjMxMyAwLjc3NywwLjQ4NyAxLjIzNiwwLjQ4N2gxMC4xNTF6IiBmaWxsPSIjMDBmNjdkIj48L3BhdGg+PHBhdGggZD0iTTE3LjYzNCw2Yy0wLjc4MywtMC4wMDMgLTEuNDc2LDAuNTA0IC0xLjcxMiwxLjI1bC0xMC45MTcsMzIuMzQ1Yy0wLjMzNSwwLjkzNCAwLjE1MSwxLjk2NCAxLjA4NSwyLjI5OWMwLjE5NiwwLjA3IDAuNDAzLDAuMTA2IDAuNjEyLDAuMTA2aDkuMDI2YzAuNjg0LC0wLjEyMiAxLjI1LC0wLjYwMyAxLjQ4MSwtMS4yNTlsMi4xNzcsLTYuNDE2bDcuNzc2LDcuMjUzYzAuMzI2LDAuMjcgMC43MzUsMC40MTkgMS4xNTgsMC40MjJoMTAuMTE0bC00LjQzNiwtMTIuNjc2bC0xMi45MzEsMC4wMDNsNy45MTMsLTIzLjMyN3oiIGZpbGw9InVybCgjY29sb3ItMl9WTEthZk9razNzQlhfZ3IyKSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMi4wNzQsNy4yMjVjLTAuMjQ3LC0wLjczMiAtMC45MzMsLTEuMjI1IC0xLjcwNiwtMS4yMjVoLTEyLjZjMC43NzIsMCAxLjQ1OSwwLjQ5MyAxLjcwNSwxLjIyNGwxMC45MzUsMzIuMzk5YzAuMzE4LDAuOTQyIC0wLjE4OCwxLjk2MyAtMS4xMywyLjI4MWMtMC4xODUsMC4wNjQgLTAuMzc5LDAuMDk2IC0wLjU3NSwwLjA5NmgxMi42YzAuOTk0LDAgMS44LC0wLjgwNiAxLjgsLTEuODAxYzAsLTAuMTk2IC0wLjAzMiwtMC4zOSAtMC4wOTUsLTAuNTc1eiIgZmlsbD0idXJsKCNjb2xvci0zX1ZMS2FmT2trM3NCWF9ncjMpIj48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"/>
        <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#555' }}>Azure Hotel Official Receipt</p>
      </div>
      
      <p><strong>Total Amount:</strong> ${getTotalAmount().toFixed(2)}</p>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {invoices.map(invoice => (
          <li key={invoice.id} style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
            <strong>Date:</strong> {invoice.date} <br />
            <strong>Details:</strong> {invoice.details} <br />
            <strong>Amount:</strong> ${invoice.amount.toFixed(2)} <br />
            <strong>Method:</strong> {invoice.method} <br />
            <strong>Reference:</strong> {invoice.reference}
          </li>
        ))}
      </ul>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        border: '2px dashed green',
        borderRadius: '50%',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 128, 0, 0.1)'
      }}>
        <span style={{ color: 'green' }}>Thank You</span> <br />
        Azure Hotel
      </div>
    </div>
  );
};

export default Invoices;
