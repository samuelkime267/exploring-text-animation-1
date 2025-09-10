import React from "react";

export default function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 17.2705V16.2705H20V17.2705H4ZM4 12.5005V11.5005H20V12.5005H4ZM4 7.73047V6.73047H20V7.73047H4Z"
        fill="currentColor"
      />
    </svg>
  );
}
