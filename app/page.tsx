"use client";

import { useState, useRef, useEffect } from "react";
import {
  Moon,
  Sun,
  Mail,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PersonalLanding() {
  const [isDark, setIsDark] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Lista de canciones
  const playlist = [
    {
      src: "/audio/La Bella Luz - Niña Tonta [Video Oficial].mp3",
      title: "Niña Tonta",
      artist: "La Bella Luz",
    },
    {
      src: "/audio/Leslie Shaw, Armonía 10 - Pendejerete (letra  video).mp3",
      title: "Pendejerete",
      artist: "Leslie Shaw & Armonía 10",
    },
  ];

  // Lista de imágenes y videos

  const media = [
    { type: "image", src: "/images/foto-amelia.jpg" },
    { type: "video", src: "/videos/momento-1.mp4" },
    { type: "video", src: "/videos/momento-3.mp4" },
    { type: "video", src: "/videos/video-1.mp4" },
    { type: "video", src: "/videos/video-2.mp4" },
  ];

  // Lista de imágenes para el carrusel
  const images = [
    {
      src: "/images/bebeypepe.jpg",
      caption: "Foto con mi Esposo",
    },
    {
      src: "/images/image-hijas.jpg",
      caption: "Foto con mis hijas",
    },
    {
      src: "/images/foto-hijos.jpg",
      caption: "Foto con mis hijos",
    },

    {
      src: "/images/foto-familiar2.png.jpg",
      caption: "Boda de oro",
    },
    {
      src: "/images/nieta-abdiel.jpg",
      caption: "Foto con mi Nieto Abdiel",
    },
    {
      src: "/images/nieta-alba.jpg",
      caption: "Foto con mi Nieta Alba",
    },
    {
      src: "/images/nieto-leonardo.jpg",
      caption: "Foto con mi Nieto Leonardo",
    },
    {
      src: "/images/nieta-valentina.jpg",
      caption: "Foto con mi Nieta Valentina",
    },
    {
      src: "/images/nieta-adriana.jpg",
      caption: "Foto con mi Nieta Adriana",
    },
    {
      src: "/images/nieta-nayeli.jpg",
      caption: "Foto con mi Nieta Nayeli",
    },
    {
      src: "/images/nieto-alejandro.jpg",
      caption: "Foto con mi Nieto favorito Alejandro",
    },
    {
      src: "/images/nieto-aldair.jpg",
      caption: "Foto con mi Nieto Aldair",
    },
    {
      src: "/images/nieta-alexandra.jpg",
      caption: "Foto con mi Nieta Alexandra",
    },
    {
      src: "/images/foto-familiar.png",
      caption: "Junto a sus seres queridos",
    },
  ];

  // Actualizar el tiempo actual
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // Cargar nueva canción cuando cambia el track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Music Player - Fijo en la parte superior */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Información de la canción */}

              <div className="hidden md:flex items-center gap-3 min-w-[200px]">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  🎵
                </div>
                <div className="text-white">
                  <p className="font-semibold text-sm">
                    {playlist[currentTrack].title}
                  </p>
                  <p className="text-xs opacity-80">
                    {playlist[currentTrack].artist}
                  </p>
                  <p>
                    <b>Musicas que me gustaban escuchar</b>
                  </p>
                </div>
              </div>

              {/* Controles principales */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  {/* Botón Anterior */}
                  <button
                    onClick={handlePrevious}
                    className="text-white hover:scale-110 transition-transform hover:bg-white/10 rounded-full p-2"
                    title="Canción anterior"
                  >
                    <SkipBack size={20} fill="white" />
                  </button>

                  {/* Botón Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="bg-white text-gray-600 rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
                    title={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? (
                      <Pause size={24} fill="currentColor" />
                    ) : (
                      <Play size={24} className="ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Botón Siguiente */}
                  <button
                    onClick={handleNext}
                    className="text-white hover:scale-110 transition-transform hover:bg-white/10 rounded-full p-2"
                    title="Siguiente canción"
                  >
                    <SkipForward size={20} fill="white" />
                  </button>
                </div>

                {/* Barra de progreso */}
                <div className="w-full max-w-md flex items-center gap-2">
                  <span className="text-white text-xs min-w-[35px]">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <span className="text-white text-xs min-w-[35px]">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Control de volumen */}
              <div className="hidden md:flex items-center gap-2 min-w-[120px]">
                <button
                  onClick={toggleMute}
                  className="text-white hover:scale-110 transition-transform"
                  title={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                />
              </div>
            </div>
          </div>

          {/* Elemento de audio */}
          <audio
            ref={audioRef}
            src={playlist[currentTrack].src}
            onEnded={handleNext}
          />
        </div>

        {/* Botón de tema - Ajustado para no chocar con el reproductor */}
        <header className="fixed top-20 right-0 p-6 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </header>

        {/* Contenido principal - Con padding-top para el reproductor */}
        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 lg:pt-40">
          {/* Hero Section */}
          <section className="mb-24">
            <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-balance">
              Amelia Isabel Paz Campos
            </h1>

            <div className="flex flex-wrap gap-6 text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <span>1951 - 2025</span>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6">
              Nací en la ciudad de Lima el 2 de julio de 1951. A los 20 años me
              casé con José Rosenthal Neira, con quien formé una hermosa familia
              y tuve la bendición de tener 6 hijos. Con el paso de los años, la
              vida también me regaló 9 nietos y la dicha de conocer a 2 de mis
              bisnietos. Aunque me hubiera gustado abrazar a todos mis nietos y
              bisnietos, me siento agradecida por los momentos que la vida me
              permitió compartir con mi familia.
            </p>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6">
              Siempre disfruté de las cosas simples y hermosas de la vida: tejer
              con paciencia, rodearme del cariño de mis seres queridos y
              atesorar cada instante en familia. Mi mayor satisfacción fue ver
              crecer a mis hijos, transmitirles mis valores y sentir el amor que
              nos unió a lo largo de los años.
            </p>
          </section>

          {/* Carrusel de Imágenes */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <div className="w-1 h-8 bg-gray-500 rounded-full" />
              Galería de Recuerdos
            </h2>

            <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              {/* Imagen actual */}
              <div className="relative w-full h-full">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].caption}
                  className="w-full h-full object-contain"
                />

                {/* Overlay con gradiente */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg font-semibold">
                    {images[currentImageIndex].caption}
                  </p>
                </div>
              </div>

              {/* Botón anterior */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                title="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Botón siguiente */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                title="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    title={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
          {/* Contact/References */}

          <section>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6">
              Actualmente me encuentro descansando en el Cementerio El Ángel, en
              El Agustino, exactamente en <br /><br />
              <span>
                <b> Jardin: SAN LAUREANO I</b>
              </span>{" "}
              <br />
              <span>
                <b>En el Sectoro 01</b>
              </span>
              <br />
              <br />
              Estaré siempre agradecida si pasan a saludarme y me dejan unas
              bellas flores, como símbolo de su cariño y recuerdo. Cada flor
              será para mí un gesto de amor que trasciende el tiempo y la
              distancia.
              <br />
              <br />
              También les pido que me tengan presente en sus oraciones. Sé que a
              través de ellas la fe y el afecto nos siguen uniendo, aunque ya no
              me encuentren físicamente a su lado. Sus plegarias son para mí un
              abrazo del alma que me llena de paz y me recuerda cuánto amor
              compartimos en vida.
              <br />
              <br />
              No me despido, porque sigo viviendo en cada recuerdo, en cada
              sonrisa y en cada pensamiento que nace de ustedes.
            </p>

            <div className="w-[100%]">
              <iframe
                className="w-[100%]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1950.9876115824106!2d-77.01059459072212!3d-12.045225672962435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c70038236af7%3A0xc6d00c6fba11bcf8!2sPabell%C3%B3n%20San%20Laureano!5e0!3m2!1ses!2spe!4v1759999026158!5m2!1ses!2spe"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </section>

          {/* Sección de Fotos y Videos */}
          <section className="mb-24 mt-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <div className="w-1 h-8 bg-gray-500 rounded-full" />
              Galería Multimedia
            </h2>

            <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              {/* Elemento actual (imagen o video) */}
              <div className="relative w-full h-full flex items-center justify-center">
                {media[currentMediaIndex].type === "image" ? (
                  <img
                    src={media[currentMediaIndex].src}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={media[currentMediaIndex].src}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Botón anterior */}
              <button
                onClick={() =>
                  setCurrentMediaIndex(
                    (prev) => (prev - 1 + media.length) % media.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                title="Anterior"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Botón siguiente */}
              <button
                onClick={() =>
                  setCurrentMediaIndex((prev) => (prev + 1) % media.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                title="Siguiente"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    title={`Ir a elemento ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
