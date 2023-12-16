import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchProfiles } from '../../api/mergedData';
import ProfileCard from '../../components/cards/ProfileCard';

export default function Search() {
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllProfiles = () => {
    searchProfiles(searchInput).then(setFilteredProfiles);
  };

  useEffect(() => {
    searchAllProfiles();
    return () => {
      setFilteredProfiles([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <>
      <div id="search-results" className="d-flex flex-wrap">
        {filteredProfiles.map((profile) => <ProfileCard key={profile.firebaseKey} profileObj={profile} onUpdate={searchProfiles} />)}
      </div>
    </>
  );
}
