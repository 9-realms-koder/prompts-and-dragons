import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200';

  const variantStyles = {
    primary: 'bg-neon-pink text-white hover:bg-neon-pink/80 hover:shadow-lg hover:shadow-neon-pink/50',
    secondary: 'bg-neon-blue text-cyber-dark hover:bg-neon-blue/80',
    outline: 'border border-neon-blue text-neon-blue hover:bg-neon-blue/10',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
