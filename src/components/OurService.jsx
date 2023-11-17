export default function OurService() {
  return (
    <div className="w-[100%] h-[90vh] bg-[#e8e4e4] flex px-16 py-16">
      <div
        className="w-[50%] h-[70vh] overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526992430293-51554a151122?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="text-black flex flex-col gap-1 px-12 py-8">
        <h3 className="font-bold text-lg">Create a template</h3>
        <p>
          Choose from any of our industry-leading website templates, designer
          fonts, and color palettes.
        </p>
        <h3 className="font-bold text-lg">Sell your products and services</h3>
        <p>
          Set up your template or sell your skills—all on a single platform
          built just for you.
        </p>
        <h3 className="font-bold text-lg">Market your business</h3>
        <p>
          On-brand email campaigns and social tools make it easy to retain
          customers and grow your base.
        </p>
      </div>
    </div>
  );
}
