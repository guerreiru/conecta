import Logo from "@/assets/imgs/logo.svg";
import WhiteProLocal from "@/assets/imgs/white-prolocal.svg";
import {
  AddressBookTabsIcon,
  CheckIcon,
  DeviceMobileIcon,
  HeartIcon,
  InstagramLogoIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MedalIcon,
  MoneyIcon,
  PencilRulerIcon,
  SparkleIcon,
  StarIcon,
  SuitcaseIcon,
  TargetIcon,
  TipJarIcon,
  UserIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-black-200">
      <section
        className="bg-gradient-to-br from-lime-600 to-lime-500 dark:from-lime-600 dark:to-lime-700 py-16 px-4 md:px-6"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <header className="flex items-center justify-center gap-2">
            <Image
              src={Logo}
              alt="Logo ProLocal"
              unoptimized
              aria-hidden="true"
            />
            <Image
              src={WhiteProLocal}
              alt="ProLocal"
              unoptimized
              aria-hidden="true"
            />
          </header>
          <h1
            id="hero-heading"
            className="text-xl md:text-2xl text-black-200 font-medium"
          >
            Conectando Profissionais à Comunidade
          </h1>

          <p className="mt-2 mb-1 text-sm font-medium text-black-200 italic">
            Siga-nos nas redes sociais:
          </p>

          <nav
            className="flex items-center justify-center gap-2"
            aria-label="Redes sociais"
          >
            <a
              href="https://www.instagram.com/prolocal.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-black-200 underline hover:text-black font-medium"
              aria-label="Visite nosso Instagram"
            >
              <InstagramLogoIcon size={30} aria-hidden="true" />
            </a>
            <a
              href="https://x.com/siteprolocal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-black-200 underline hover:text-black font-medium"
              aria-label="Visite nosso perfil no X (Twitter)"
            >
              <XLogoIcon size={30} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto">
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            O que é o ProLocal?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
            O ProLocal é a plataforma que conecta você aos melhores
            profissionais e serviços da sua região. Seja você um cliente em
            busca de soluções ou um profissional querendo expandir seus
            negócios, o ProLocal é o lugar certo para fazer acontecer.
          </p>
        </div>
      </section>

      <section
        className="py-12 px-4 md:px-6 bg-gray-50 dark:bg-black-100"
        aria-labelledby="clients-heading"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <UserIcon
                size={36}
                weight="duotone"
                className="dark:text-lime-400"
                aria-hidden="true"
              />
              <h2
                id="clients-heading"
                className="text-3xl md:text-4xl font-bold"
              >
                Para Clientes
              </h2>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Encontre o Profissional Ideal Perto de Você
            </p>
          </header>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
            Precisa de um eletricista? Encanador? Professor particular?
            Designer? No ProLocal, você encontra profissionais qualificados na
            sua cidade com apenas alguns cliques.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10" role="list">
            <FeatureCard
              icon={<MagnifyingGlassIcon size={32} weight="duotone" />}
              title="Busca Inteligente"
              description="Encontre serviços por categoria, localização ou busca por nome"
            />
            <FeatureCard
              icon={<MapPinIcon size={32} weight="duotone" />}
              title="Filtro por Localização"
              description="Veja apenas profissionais que atendem na sua região"
            />
            <FeatureCard
              icon={<StarIcon size={32} weight="duotone" />}
              title="Avaliações"
              description="Leia avaliações de outros clientes antes de contratar"
            />
            <FeatureCard
              icon={<TipJarIcon size={32} weight="duotone" />}
              title="Comparação de Preços"
              description="Veja valores e tipos de cobrança (por hora, por projeto, etc.)"
            />
            <FeatureCard
              icon={<DeviceMobileIcon size={32} weight="duotone" />}
              title="Contato Direto"
              description="Entre em contato com profissionais via WhatsApp"
            />
            <FeatureCard
              icon={<MedalIcon size={32} weight="duotone" />}
              title="Profissionais em Destaque"
              description="Veja os melhores profissionais primeiro nas buscas"
            />
          </div>

          <article className="bg-white dark:bg-black-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Como Funciona
            </h3>
            <ol className="space-y-4">
              <StepItem
                number={1}
                text="Cadastre-se gratuitamente como cliente"
              />
              <StepItem number={2} text="Busque o serviço que você precisa" />
              <StepItem
                number={3}
                text="Filtre por localização para encontrar profissionais perto de você"
              />
              <StepItem
                number={4}
                text="Compare perfis e avaliações para escolher o melhor"
              />
              <StepItem
                number={5}
                text="Entre em contato direto com o profissional escolhido"
              />
            </ol>
          </article>
        </div>
      </section>

      <section
        className="py-12 px-4 md:px-6 dark:bg-black-100"
        aria-labelledby="professionals-heading"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SuitcaseIcon
                size={36}
                weight="duotone"
                className="dark:text-lime-400"
                aria-hidden="true"
              />
              <h2
                id="professionals-heading"
                className="text-3xl md:text-4xl font-bold"
              >
                Para Profissionais e Empresas
              </h2>
            </div>

            <p className="text-xl text-gray-700 dark:text-gray-300">
              Alcance Mais Clientes e Cresça Seu Negócio
            </p>
          </header>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
            Você é profissional autônomo, prestador de serviços ou possui uma
            empresa? O ProLocal é a vitrine perfeita para mostrar seu trabalho e
            conquistar novos clientes na sua região.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10" role="list">
            <FeatureCard
              icon={<AddressBookTabsIcon size={32} weight="duotone" />}
              title="Perfil Profissional Completo"
              description="Crie um perfil detalhado com seus dados, experiência e portfólio"
            />
            <FeatureCard
              icon={<PencilRulerIcon size={32} weight="duotone" />}
              title="Gestão de Serviços"
              description="Cadastre e gerencie todos os serviços que você oferece"
            />
            <FeatureCard
              icon={<MoneyIcon size={32} weight="duotone" />}
              title="Definição de Preços"
              description="Configure valores e tipos de cobrança personalizados"
            />
            {/* <FeatureCard
              icon="📊"
              title="Painel de Controle"
              description="Visualize e gerencie tudo em um só lugar"
            /> */}
            <FeatureCard
              icon={<StarIcon size={32} weight="duotone" />}
              title="Sistema de Avaliações"
              description="Receba avaliações e construa sua reputação"
            />
            <FeatureCard
              icon={<TargetIcon size={32} weight="duotone" />}
              title="Destaque nos Resultados"
              description="Apareça primeiro nas buscas com planos premium"
            />
            <FeatureCard
              icon={<MapPinIcon size={32} weight="duotone" />}
              title="Visibilidade Local"
              description="Seus serviços aparecem para clientes da sua região"
            />
          </div>

          <div className="bg-lime-50 dark:bg-lime-950 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Como Funciona
            </h3>
            <ol className="space-y-4">
              <StepItem
                number={1}
                text="Cadastre-se como profissional ou empresa"
              />
              <StepItem
                number={2}
                text="Preencha seu perfil com informações completas"
              />
              <StepItem
                number={3}
                text="Cadastre seus serviços com descrições e preços"
              />
              <StepItem
                number={4}
                text="Receba contatos de clientes interessados"
              />
              <StepItem
                number={5}
                text="Construa sua reputação através de avaliações"
              />
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6 bg-gray-50 dark:bg-black-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparkleIcon
              size={36}
              weight="duotone"
              className="dark:text-lime-400"
            />
            <h2 className="text-3xl md:text-4xl font-bold">
              Diferenciais do ProLocal
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <DifferentialCard
              icon={
                <MapPinIcon
                  size={32}
                  weight="duotone"
                  className="dark:text-lime-400"
                />
              }
              title="Foco em Serviços Locais"
              items={[
                "Busca por estado e cidade",
                "Conectando pessoas da mesma região",
                "Fortalecendo a economia local",
              ]}
            />
            <DifferentialCard
              icon={
                <HeartIcon
                  size={32}
                  weight="duotone"
                  className="dark:text-lime-400"
                />
              }
              title="Gratuito para Começar"
              items={[
                "Cadastro gratuito para todos",
                "Planos premium com benefícios extras",
                "Sem taxas escondidas",
              ]}
            />
            <DifferentialCard
              icon={
                <TargetIcon
                  size={32}
                  weight="duotone"
                  className="dark:text-lime-400"
                />
              }
              title="Interface Simples"
              items={[
                "Design moderno e responsivo",
                "Funciona em todos os dispositivos",
                "Modo escuro disponível",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-600 dark:to-lime-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Junte-se à Comunidade ProLocal
          </h2>
          <p className="text-lg md:text-xl text-black-200 mb-8">
            Seja você um cliente em busca de qualidade ou um profissional
            querendo crescer, o ProLocal é a plataforma que une necessidades e
            oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-lg hover:brightness-90 transition"
            >
              Cadastre-se Agora
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:brightness-90 transition border-2 border-black dark:border-white"
            >
              Explorar Serviços
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-black-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <div className="text-3xl mb-3 dark:dark:text-lime-400">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function StepItem({ number, text }: { number: number; text: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold">
        {number}
      </span>
      <span className="text-gray-700 dark:text-gray-300 pt-1">{text}</span>
    </li>
  );
}

function DifferentialCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white dark:bg-black-200 rounded-xl p-6 shadow-md">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckIcon className="text-lime-500 mt-1 flex-shrink-0" size={18} />
            <span className="text-gray-600 dark:text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
