import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Ismail MOUYAHADA",
  description: "Politique de confidentialité et de protection des données personnelles d'Ismail MOUYAHADA.",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Politique de Confidentialité</h1>
        <p className="text-xl text-muted-foreground">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          La présente politique de confidentialité décrit comment Ismail MOUYAHADA collecte, utilise et protège les
          informations personnelles que vous pourriez fournir lors de l'utilisation de ce site web et des services
          associés. Nous nous engageons à assurer la protection de votre vie privée et à traiter vos données
          personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et aux autres lois
          applicables en matière de protection des données.
        </p>

        <h2>2. Collecte des données personnelles</h2>
        <p>Nous pouvons collecter les types d'informations personnelles suivants :</p>
        <ul>
          <li>Informations d'identification (nom, prénom, adresse email, numéro de téléphone)</li>
          <li>Informations professionnelles (entreprise, poste)</li>
          <li>Informations techniques (adresse IP, type de navigateur, cookies)</li>
          <li>Informations relatives à vos demandes et projets</li>
        </ul>
        <p>Ces informations sont collectées lorsque vous :</p>
        <ul>
          <li>Remplissez un formulaire de contact</li>
          <li>Vous inscrivez à notre newsletter</li>
          <li>Demandez un devis ou une consultation</li>
          <li>Utilisez notre site web</li>
        </ul>

        <h2>3. Utilisation des données personnelles</h2>
        <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>
        <ul>
          <li>Répondre à vos demandes et questions</li>
          <li>Vous fournir les services que vous avez demandés</li>
          <li>Gérer notre relation commerciale</li>
          <li>Vous envoyer des communications marketing (avec votre consentement)</li>
          <li>Améliorer notre site web et nos services</li>
          <li>Respecter nos obligations légales</li>
        </ul>

        <h2>4. Base légale du traitement</h2>
        <p>Nous traitons vos données personnelles sur les bases légales suivantes :</p>
        <ul>
          <li>Votre consentement</li>
          <li>L'exécution d'un contrat auquel vous êtes partie</li>
          <li>Le respect de nos obligations légales</li>
          <li>Nos intérêts légitimes (amélioration de nos services, prévention de la fraude)</li>
        </ul>

        <h2>5. Conservation des données</h2>
        <p>
          Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour
          lesquelles elles ont été collectées, sauf si une période de conservation plus longue est requise ou permise
          par la loi.
        </p>
        <p>Les critères utilisés pour déterminer nos périodes de conservation incluent :</p>
        <ul>
          <li>La durée pendant laquelle nous entretenons une relation avec vous</li>
          <li>Nos obligations légales</li>
          <li>Les délais de prescription applicables</li>
          <li>Les litiges potentiels</li>
        </ul>

        <h2>6. Partage des données personnelles</h2>
        <p>
          Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données personnelles avec
          :
        </p>
        <ul>
          <li>Des prestataires de services qui nous aident à exploiter notre site web et à fournir nos services</li>
          <li>Des autorités publiques lorsque la loi l'exige</li>
        </ul>
        <p>
          Tous nos prestataires de services sont tenus de respecter la confidentialité et la sécurité de vos données
          personnelles.
        </p>

        <h2>7. Transferts internationaux de données</h2>
        <p>
          Vos données personnelles peuvent être transférées et traitées dans des pays autres que celui dans lequel vous
          résidez. Ces pays peuvent avoir des lois sur la protection des données différentes de celles de votre pays.
        </p>
        <p>
          Lorsque nous transférons vos données personnelles en dehors de l'Espace Économique Européen, nous nous
          assurons qu'un niveau de protection adéquat est mis en place, conformément aux exigences du RGPD.
        </p>

        <h2>8. Sécurité des données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
          personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération et la destruction.
        </p>
        <p>Ces mesures incluent, sans s'y limiter :</p>
        <ul>
          <li>Le chiffrement des données sensibles</li>
          <li>Des contrôles d'accès stricts</li>
          <li>Des sauvegardes régulières</li>
          <li>Des audits de sécurité</li>
        </ul>

        <h2>9. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
        <ul>
          <li>
            Droit d'accès : vous pouvez demander une copie des données personnelles que nous détenons à votre sujet
          </li>
          <li>Droit de rectification : vous pouvez demander la correction de données inexactes ou incomplètes</li>
          <li>
            Droit à l'effacement : vous pouvez demander la suppression de vos données personnelles dans certaines
            circonstances
          </li>
          <li>
            Droit à la limitation du traitement : vous pouvez demander la limitation du traitement de vos données
            personnelles dans certaines circonstances
          </li>
          <li>
            Droit à la portabilité des données : vous pouvez demander le transfert de vos données personnelles à un
            autre responsable du traitement
          </li>
          <li>
            Droit d'opposition : vous pouvez vous opposer au traitement de vos données personnelles dans certaines
            circonstances
          </li>
          <li>
            Droit de retirer votre consentement : lorsque le traitement est basé sur votre consentement, vous pouvez le
            retirer à tout moment
          </li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter via le formulaire de contact disponible sur notre site web ou
          par email à [votre-email@domaine.com].
        </p>

        <h2>10. Cookies et technologies similaires</h2>
        <p>
          Notre site web utilise des cookies et des technologies similaires pour améliorer votre expérience de
          navigation, analyser l'utilisation du site et personnaliser le contenu.
        </p>
        <p>
          Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Pour plus
          d'informations sur notre utilisation des cookies, veuillez consulter notre Politique de Cookies.
        </p>

        <h2>11. Modifications de la politique de confidentialité</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements
          dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
        </p>
        <p>
          Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des modifications. La
          date de la dernière mise à jour est indiquée en haut de cette politique.
        </p>

        <h2>12. Contact</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou le
          traitement de vos données personnelles, veuillez nous contacter via le formulaire de contact disponible sur
          notre site web.
        </p>
      </div>
    </div>
  )
}

