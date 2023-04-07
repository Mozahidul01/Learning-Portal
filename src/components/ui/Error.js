export default function Error({ message }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-red-200 px-4 py-2 text-red-800 rounded shadow w-full">
        <span className="block text-sm text-center font-medium">{message}</span>
      </div>
    </div>
  );
}
