export default function Tag(params) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginRight: "8px",
        padding: "5px 10px",
      }}
    >
      {params.content}
    </div>
  );
}
