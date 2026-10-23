/** An inline script that runs while the browser parses the HTML (so it can set
    classes before the first paint) without React's dev warning about <script>
    tags in rendered components. On the server it is a normal script; when React
    re-renders it in the browser it becomes inert text/plain, because a script
    inserted that way would never execute anyway. */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
