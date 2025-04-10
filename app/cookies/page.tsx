import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de cookies | Ismail MOUYAHADA",
  description: "Politique d'utilisation des cookies sur le site d'Ismail MOUYAHADA.",
}

export default function CookiesPage() {
  return (
    <div className="container py-12 space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Politique de Cookies</h1>
        <p className="text-xl text-muted-foreground">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte qui est stocké sur votre ordinateur, tablette ou smartphone lorsque vous
          visitez un site web. Les cookies permettent au site web de reconnaître votre appareil et de mémoriser
          certaines informations sur votre visite, comme vos préférences de langue ou vos informations de connexion.
        </p>

        <h2>2. Comment utilisons-nous les cookies ?</h2>
        <p>Nous utilisons différents types de cookies pour les finalités suivantes :</p>

        <h3>Cookies essentiels</h3>
        <p>
          Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés dans nos
          systèmes. Ils sont généralement établis en réponse à des actions que vous effectuez et qui constituent une
          demande de services, telles que la définition de vos préférences de confidentialité, la connexion ou le
          remplissage de formulaires. Vous pouvez configurer votre navigateur pour qu'il bloque ou vous avertisse de
          l'existence de ces cookies, mais certaines parties du site ne fonctionneront pas.
        </p>

        <h3>Cookies de performance</h3>
        <p>
          Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer et d'améliorer les
          performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à
          voir comment les visiteurs se déplacent sur le site. Toutes les informations recueillies par ces cookies sont
          agrégées et donc anonymes. Si vous n'autorisez pas ces cookies, nous ne saurons pas quand vous avez visité
          notre site.
        </p>

        <h3>Cookies de fonctionnalité</h3>
        <p>
          Ces cookies permettent au site web d'offrir une fonctionnalité et une personnalisation améliorées. Ils peuvent
          être mis en place par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages. Si
          vous n'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.
        </p>

        <h3>Cookies de ciblage</h3>
        <p>
          Ces cookies peuvent être mis en place par nos partenaires publicitaires via notre site. Ils peuvent être
          utilisés par ces entreprises pour établir un profil de vos intérêts et vous proposer des publicités
          pertinentes sur d'autres sites. Ils ne stockent pas directement des informations personnelles, mais sont basés
          sur l'identification unique de votre navigateur et de votre appareil Internet. Si vous n'autorisez pas ces
          cookies, vous connaîtrez une publicité moins ciblée.
        </p>

        <h2>3. Cookies tiers</h2>
        <p>
          En plus de nos propres cookies, nous pouvons également utiliser divers cookies tiers pour signaler les
          statistiques d'utilisation du site, diffuser des publicités, etc. Ces cookies sont décrits ci-dessous :
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> : Nous utilisons Google Analytics pour comprendre comment les visiteurs
            interagissent avec notre site. Ces cookies collectent des informations sur le nombre de visiteurs, les pages
            visitées et le temps passé sur le site.
          </li>
          <li>
            <strong>Google Ads</strong> : Ces cookies nous aident à mesurer l'efficacité de nos campagnes publicitaires
            et à personnaliser le contenu des annonces en fonction de vos intérêts.
          </li>
          <li>
            <strong>Facebook Pixel</strong> : Ce cookie nous permet de mesurer, d'optimiser et de créer des audiences
            pour nos campagnes publicitaires sur Facebook.
          </li>
          <li>
            <strong>LinkedIn Insight Tag</strong> : Ce cookie nous permet de suivre les conversions, de cibler les
            audiences et d'obtenir des informations démographiques sur les visiteurs qui interagissent avec notre site.
          </li>
        </ul>

        <h2>4. Comment gérer les cookies ?</h2>
        <p>
          Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les
          cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour qu'ils
          les bloquent. Mais si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences
          chaque fois que vous visiterez un site, et certains services et fonctionnalités pourraient ne pas fonctionner.
        </p>
        <p>Vous pouvez gérer vos préférences en matière de cookies de différentes manières, notamment :</p>
        <ul>
          <li>
            <strong>Paramètres du navigateur</strong> : La plupart des navigateurs vous permettent de voir quels cookies
            vous avez et de les supprimer individuellement ou de bloquer les cookies de certains ou de tous les sites.
            Notez que si vous supprimez tous les cookies, toutes les préférences que vous avez définies seront perdues,
            y compris la possibilité de refuser les cookies, car cette fonction elle-même nécessite le placement d'un
            cookie de refus.
          </li>
          <li>
            <strong>Outils tiers</strong> : Vous pouvez utiliser des outils comme le site{" "}
            <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">
              Your Online Choices
            </a>{" "}
            pour contrôler les cookies de publicité comportementale.
          </li>
        </ul>

        <h2>5. Modifications de notre politique de cookies</h2>
        <p>
          Nous pouvons mettre à jour cette politique de cookies de temps à autre pour refléter, par exemple, les
          changements apportés aux cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou
          réglementaires. Veuillez donc consulter régulièrement cette politique pour rester informé de notre utilisation
          des cookies et des technologies connexes.
        </p>
        <p>La date en haut de cette politique indique quand elle a été mise à jour pour la dernière fois.</p>

        <h2>6. Contact</h2>
        <p>
          Si vous avez des questions concernant notre utilisation des cookies ou d'autres technologies, veuillez nous
          contacter via le formulaire de contact disponible sur notre site web.
        </p>
      </div>
    </div>
  )
}

