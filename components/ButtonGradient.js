import React from "react";

const ButtonGradient = ({ title = "Generate QR", onClick = () => window.location.href='/create-qr' }) => {
  return (
    <button className="btn btn-gradient animate-shimmer" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
