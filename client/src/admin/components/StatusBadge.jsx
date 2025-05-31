// components/StatusBadge.jsx
import React from 'react';

const statusColors = {
  Menunggu: '#FF9AA2',   // pink lembut
  Diproses: '#FF8C00',   // oranye
  Dikirim: '#FFD400',    // kuning
  Selesai: '#00C851',    // hijau
};

export const StatusBadge = ({ status, date }) => {
  // Ambil warna berdasarkan status
  const color = statusColors[status] || '#ccc';

  // Format hanya jam:menit (bisa disesuaikan)
  const timeString = date
    ? new Date(date).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="d-flex flex-column align-items-center gap-1">
      {/* Lingkaran warna + teks status */}
      <div className="d-flex align-items-center gap-2">
        <span
          style={{
            backgroundColor: color,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
        <span className="text-capitalize fw-medium">{status}</span>
      </div>

      {/* Tampilkan waktu di bawah badge */}
      {timeString && (
        <small className="text-muted" style={{ fontSize: '0.8rem' }}>
          {timeString}
        </small>
      )}
    </div>
  );
};

export default StatusBadge ;