import porscheRainyConceptImg from "@/assets/images/porche-rainy-concept.jpg";

export default function Design() {
  return (
    <section className="relative w-full h-screen">
      <div className="w-full h-full relative z-[2] p-8 bg-black/50 flex flex-col items-center justify-between">
        <h1 className="text-center text-white !text-9xl max-w-[65pc] font-medium">
          Iconic Design Modern Innovation
        </h1>
        <p className="text-center text-white max-w-[30pc] capitalize text-xl">
          Crafted with elegance, refined with innovation, every curve tells a
          story.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-full h-full">
        <img
          src={porscheRainyConceptImg}
          alt="Porsche rainy concept"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
