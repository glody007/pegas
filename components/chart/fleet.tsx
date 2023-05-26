
export default function Fleet() {
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-100 text-xl font-semibold">Fleet</h2>
            </div>
          </div>
        </div>
        <div className="px-4">
            <div className="text-2xl font-bold text-sky-500">
                30
            </div>
            <div className="text-xs text-gray-500 mt-2">
                This month
            </div>
        </div>
      </div>
    )
}