import React from "react";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="127" cy="98" r="97" />
    <rect x="23" y="213" rx="7" ry="7" width="220" height="22" />
    <rect x="24" y="252" rx="7" ry="7" width="220" height="105" />
    <rect x="27" y="380" rx="7" ry="7" width="66" height="30" />
    <rect x="126" y="373" rx="20" ry="20" width="118" height="44" />
  </ContentLoader>
);

export default Skeleton;
