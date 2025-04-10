import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Ismail MOUYAHADA",
  description: "Conditions générales d'utilisation du site et des services d'Ismail MOUYAHADA.",
}

export default function TermsPage() {
  return (
    <div className="container py-12 space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Conditions Générales d'Utilisation</h1>
        <p className="text-xl text-muted-foreground">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Bienvenue sur le site web d'Ismail MOUYAHADA. Les présentes conditions générales d'utilisation régissent votre
          utilisation de ce site web et de tous les services associés. En accédant à ce site, vous acceptez d'être lié
          par ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
        </p>

        <h2>2. Définitions</h2>
        <p>
          Dans les présentes conditions générales d'utilisation, les termes suivants auront la signification qui leur
          est attribuée ci-dessous :
        </p>
        <ul>
          <li>"Site" désigne le site web accessible à l'adresse [votre-domaine.com]</li>
          <li>"Services" désigne tous les services proposés par Ismail MOUYAHADA via le Site</li>
          <li>"Utilisateur" désigne toute personne qui accède au Site et/ou utilise les Services</li>
          <li>
            "Contenu" désigne tous les éléments présents sur le Site, incluant mais non limité aux textes, images,
            vidéos, logos, et code source
          </li>
        </ul>

        <h2>3. Utilisation du Site</h2>
        <p>En utilisant ce Site, vous vous engagez à :</p>
        <ul>
          <li>Utiliser le Site conformément à sa destination et aux lois en vigueur</li>
          <li>Ne pas tenter d'accéder de manière non autorisée à des parties sécurisées du Site</li>
          <li>Ne pas perturber le fonctionnement normal du Site</li>
          <li>Ne pas utiliser le Site pour diffuser des contenus illégaux, offensants ou nuisibles</li>
          <li>
            Ne pas utiliser de robots, spiders ou autres moyens automatisés pour accéder au Site sans autorisation
            préalable
          </li>
        </ul>

        <h2>4. Propriété intellectuelle</h2>
        <p>
          Tous les éléments du Site, incluant mais non limité aux textes, images, vidéos, logos, et code source, sont
          protégés par les lois sur la propriété intellectuelle et appartiennent à Ismail MOUYAHADA ou sont utilisés
          avec l'autorisation de leurs propriétaires.
        </p>
        <p>
          Toute reproduction, distribution, modification ou utilisation de ces éléments, en tout ou partie, sans
          autorisation préalable écrite d'Ismail MOUYAHADA est strictement interdite.
        </p>

        <h2>5. Services et prestations</h2>
        <p>
          Les Services proposés par Ismail MOUYAHADA via le Site sont décrits dans les pages correspondantes. Les
          conditions spécifiques à chaque Service, notamment en termes de tarifs, délais et modalités d'exécution, sont
          précisées dans les devis et contrats établis entre Ismail MOUYAHADA et ses clients.
        </p>
        <p>
          Ismail MOUYAHADA se réserve le droit de modifier, suspendre ou interrompre tout Service à tout moment, avec ou
          sans préavis.
        </p>

        <h2>6. Responsabilité</h2>
        <p>
          Ismail MOUYAHADA s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur le
          Site. Cependant, Ismail MOUYAHADA ne peut garantir l'exactitude, la précision ou l'exhaustivité des
          informations mises à disposition sur le Site.
        </p>
        <p>En conséquence, Ismail MOUYAHADA décline toute responsabilité :</p>
        <ul>
          <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le Site</li>
          <li>
            Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des
            informations mises à disposition sur le Site
          </li>
          <li>
            Pour tous dommages directs ou indirects, quelles qu'en soient les causes, origines, natures ou conséquences,
            résultant de l'accès au Site ou de l'impossibilité d'y accéder
          </li>
        </ul>

        <h2>7. Liens externes</h2>
        <p>
          Le Site peut contenir des liens vers des sites web externes. Ces liens sont fournis uniquement pour la
          commodité des Utilisateurs. Ismail MOUYAHADA n'exerce aucun contrôle sur le contenu de ces sites et décline
          toute responsabilité quant à leur contenu.
        </p>

        <h2>8. Protection des données personnelles</h2>
        <p>
          La collecte et le traitement des données personnelles des Utilisateurs sont régis par la Politique de
          Confidentialité, accessible sur le Site.
        </p>

        <h2>9. Modification des conditions</h2>
        <p>
          Ismail MOUYAHADA se réserve le droit de modifier les présentes conditions générales d'utilisation à tout
          moment. Les Utilisateurs seront informés de toute modification par la publication des conditions mises à jour
          sur le Site. L'utilisation continue du Site après la publication des conditions modifiées constitue
          l'acceptation de ces modifications.
        </p>

        <h2>10. Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes conditions générales d'utilisation sont régies par le droit français. Tout litige relatif à
          l'interprétation ou à l'exécution des présentes conditions sera soumis aux tribunaux compétents de [Ville],
          sauf disposition légale contraire.
        </p>

        <h2>11. Contact</h2>
        <p>
          Pour toute question concernant les présentes conditions générales d'utilisation, veuillez contacter Ismail
          MOUYAHADA via le formulaire de contact disponible sur le Site.
        </p>
      </div>
    </div>
  )
}

