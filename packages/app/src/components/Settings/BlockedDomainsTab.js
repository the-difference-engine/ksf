import React, { useState, useEffect } from 'react';
import domainAPI from '../../utils/API/domainAPI';
import Domain from './Domain';

const BlockedDomainsTab = () => {
  const [domainValue, setDomainValue] = useState({ name: '' });
  const [allDomains, setAllDomains] = useState([]);
  const [taco, setTaco] = useState(false);

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await domainAPI.addDomain({ name: domainValue });
      console.log('clicked----------');
      let domainList = allDomains;
      // domainList.push(response);
      console.log("This is res")
      console.dir(res)
      setAllDomains((list) => {
        return [...list, res.data]
      })
      
      console.log("This is the new domain list.")
      console.log(domainList);
      // setAllDomains(domainList);
    } catch (error) {
      console.log('Error adding domain');
      console.log(error);
      console.dir(error);
    }
  };

  async function getDomains() {
    try {
      const { data } = await domainAPI.findDomains();
      console.log(data, '------data------');
      // allDomains = data
      setAllDomains(data)
    } catch (error) {
      console.log('Error getting all domains');
    }
  }

  useEffect(() => {
    getDomains();
  }, []);

  // useEffect(() => {
  //   setTaco((taco) => !taco)
  //   console.log("Set taco triggered.")
  // }, [allDomains]);

  // getDomains()
  // const domainList = allDomains.map((domain) => {
  //   return <li key={domain.id}>{domain.name}</li>;
  // });

  // console.log(domainValue, '---------------DominValue-=');
  return (
    <main className="settings__main">
      <h2 className="settings__heading">Blocked Domains</h2>
            <input type="text" value={domainValue.name} onChange={handleChange} />
            <button onClick={(e) => { handleSubmit(e); }}>Add Domain</button>
    {allDomains.map((domain) => {
        return <Domain domain={domain} />
      })
    }
    </main>
  );
};

export default BlockedDomainsTab;
