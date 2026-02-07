import { useStaticQuery, graphql } from "gatsby";

interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
}

export function useSiteMetadata(): SiteMetadata {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `);

  return data.site?.siteMetadata as SiteMetadata;
}




