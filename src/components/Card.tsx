import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: string;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  icon,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {(title || description) && (
        <div className="flex px-6 py-4 items-center gap-2">
          {icon && <img src={icon} className="w-12 h-12" alt={icon} />}
          <div>
            {title && (
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm">
          {footer}
        </div>
      )}
    </div>
  );
};
