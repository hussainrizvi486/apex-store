const Index = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <h1 className="text-8xl font-bold text-red-600 m-0">404</h1>
            <h2 className="text-2xl mt-4 mb-4 text-gray-800">Page Not Found</h2>
            <p className="max-w-md text-center text-gray-600">
                But if you don't change your direction, and if you keep looking, you may end up where you are heading.
            </p>
            <a
                href="/"
                className="mt-8 text-blue-600 underline font-medium hover:text-blue-800 transition-colors"
            >
                Go back home
            </a>
        </div>
    )
}


export default Index;