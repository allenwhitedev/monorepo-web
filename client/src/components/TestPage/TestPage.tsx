import React, { useEffect } from 'react';
import styles from './TestPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { testEntityFetchThunk } from '../../state/data/testEntity/operations';
import { testEntityStateSel } from '../../state/data/testEntity/selectors';

function TestPage() {
  const dispatch = useDispatch()
  const testEntities = useSelector(testEntityStateSel)

  useEffect(() => {
    dispatch(testEntityFetchThunk())
  }, [dispatch])

  const testEntityListItems = testEntities.allIds.map(id => {
    const testEntity = testEntities.byId[id]
    return (
      <li key={id}>{testEntity.name}, {testEntity.createdAt.format()}</li>
    )
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Test backend fetch response:</h3>
        <h4>Test Entities From Monorepo database:</h4>
        <ul className={styles.list}> 
          {testEntityListItems}
        </ul>
      </header>
    </div>
  );
}

export default TestPage;
