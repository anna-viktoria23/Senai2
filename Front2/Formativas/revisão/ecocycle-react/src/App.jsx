import Header from "./components/header";
import Rodape from "./components/Rodape";
import CardMaterial from "./components/CardMaterial";
import "./App.css";


function App() {
  const cidade = "Itu/SP";
  return (
    <main className="app">
      <Header />
      <p className="subtitulo">Coleta seletiva em {cidade}</p>
      {/* T4: texto vai entre aspas; número vai entre { } */}
      <section className="lista">
        <CardMaterial nome="Papel" lixeira="Azul" precoKg={0.5} />
      </section>
      <Rodape />
    </main>
  );
}
export default App;
