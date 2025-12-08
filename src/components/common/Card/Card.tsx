import React from "react";
import "./Card.css";

export type OutlineType =
  | "none"
  | "subtle"
  | "strong"
  | "primary"
  | "dashed"
  | "glow";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  outline?: OutlineType;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  outline = "none",
}) => {
  return (
    <div
      className={[
        "card",
        hoverable ? "card-hoverable" : "",
        onClick ? "card-clickable" : "",
        outline !== "none" ? `card-outline-${outline}` : "",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`card-header ${className}`}>{children}</div>;

export const CardBody = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`card-body ${className}`}>{children}</div>;

export const CardFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`card-footer ${className}`}>{children}</div>;
