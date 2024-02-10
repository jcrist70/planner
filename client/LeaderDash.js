import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// COMPONENETS
import Total from '../components/Total';
import RightComboGraph from '../components/RightComboGraph';
import LeftComboGraph from '../components/LeftComboGraph';
import DateSelection from '../components/DateSelection';
import Table1 from '../components/Table1';
import NegNameTraineeScoreTable from '../components/NegNameTraineeScoreTable';
import TrainingProgTable from '../components/TrainingProgTable';
// APIs
import { verifyUser } from '../apis/admin.api';
import { getUnityModuleCount } from '../apis/user.api';
import { fetchChapterDataApi } from '../apis/data.api';
// PROC
import { procAdminUnityData } from '../processes/fetchUserDataRtkQ';
// REDUX
import { setCurrentPage } from '../redux/app.slice';
import { useGetChaptersQuery, useGetUserDataQuery } from '../apis/rtkData.api';
import { getChapterGroupApi } from '../apis/data.api';
// COMPONENTS


const LeaderDash = () => {
  // console.log('LeaderDash RENDERING');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ dbUSer, setDbUser ] = useState({});
  const [ revalidate, setRevalidate ] = useState(0);
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false); // eslint-disable-line
  const [loadTest, setLoadTest] = useState(false); // eslint-disable-line
  const [startDate, setStartDate] = useState(new Date('07/01/23'));
  const [endDate, setEndDate] = useState(new Date());
  const [maxModuleCount, setMaxModuleCount] = useState(0);
  const [table1Data, setTable1Data] = useState([]);
  const [negTableData, setNegTableData] = useState([]);
  const [trainingProgData, setTrainingProgData] = useState([]);
  const [duration, setDuration] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [ chapterGroup, setChapterGroup ] = useState({});
  const [negotiationCount, setNegotiationCount] = useState(0);
  const [negotiationTime, setNegotiationTime] = useState(0);
  const { reactVerbosity, privacy } = useSelector((state) => ({ ...state.app })); // eslint-disable-line
  const { user } = useSelector((state) => ({ ...state.user })); // eslint-disable-line

  const selection = {
    startDate,
    endDate
  };
  /* eslint-disable */
  const {
    data: chData,
    error,
    isLoading: isLoadingChData,
    isSuccess,
    isError,
    isFetching
  } = useGetChaptersQuery({
    authToken: user.idToken,
    user,
    selection
  });
  const {
    data: usrData,
    error: usrErr,
    isLoading: isLoadingUsrData
  } = useGetUserDataQuery({
    authToken: user.idToken,
    user,
    selection
  }); 
  /* eslint-enable */
  useEffect(() => {

    dispatch(setCurrentPage('leaderDash'));
    // const chGrp = getChapterGroupApi(user.idToken, user.user.organization.name);
    // console.log('--------------> LeaderDash chGrp:', chGrp)
    // setChapterGroup(chGrp);
  }, []);

  useEffect(() => {
    getChapterGroup();
  }, [user]);

  const getChapterGroup = async () => {
    const chGrp = await getChapterGroupApi(user.idToken, 'default');
    console.log('--------------> LeaderDash chGrp:', chGrp)
    if (chGrp.err) {
      setRevalidate((revalidate) => revalidate+1);
    }
    setChapterGroup(chGrp);
  }

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      navigate('/', { replace: false });
    });
    return async () => {};
  }, []); // eslint-disable-line

  useEffect(() => {

    const verify = async () => {
      try {
        const verification = await verifyUser();
        reactVerbosity === 2 &&
          console.log('====> verification.data:', verification.data);
        if (
          verification.data.cookie !== 'expired' &&
          parseInt(verification.data.expiresIn) <= 5
        ) {
          // console.log('!!! SESSION EXPIRED, RELOAD SITE !!!')
          window.location.reload(false);
        } else {
          setUserLoggedIn(true);
        }
      } catch (err) {
        reactVerbosity === 2 && console.log('verifyUser error:', err)
      }

    };
    verify();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      reactVerbosity === 2 && console.log('+++++> USER DATA:', userData);
      buildDataForTable1();
      // buildDataForTable2();
      buildDataForNegTable();
      buildDataForTrainingProgressTable();
    }
    reactVerbosity === 2 && console.log('DATES:', startDate, endDate);
  }, [userData && userData.sessionCount]); // eslint-disable-line

  useEffect(() => {
    console.log('user', user)
    if (!isLoadingUsrData) {
      fetchUserDataProcess();
    }
  }, [isLoadingUsrData, usrData]); // eslint-disable-line

  const fetchUserDataProcess = async () => {
    const maxModuleCount = await getUnityModuleCount();
    setMaxModuleCount(maxModuleCount.data);
    const chapterData = await fetchChapterDataApi(user.idToken, user);
    const { userDataObj } = await procAdminUnityData(usrData, moduleCount);

    reactVerbosity === 2 &&
      console.log('=======> fetchAdminUnityData:', userDataObj);
    setDuration(userDataObj.duration);
    setNegotiationCount(userDataObj.negotiations);
    setNegotiationTime(userDataObj.time);
    setChapters(chapterData.data);
    setModuleCount(userDataObj.modules);
    setUserData(userDataObj);
  };

  const buildDataForTable1 = async () => {
    // SESSION REPORTING
    // console.log('+++++> USER DATA:', userData)
    const tableData =
      userData.sessions &&
      userData.sessions.map((s, index) => { // eslint-disable-line
        // console.log('TABLE1 PREP s:', index, s)
        // console.log('====> s.user.name, userData.lengthsObj:',s.user.name, userData.lengthsObj)

        if (userData.negotiationsPerSession[index] !== undefined) {
          const table1Data = {
            name: s.user.name,
            modules: userData.negotiationsPerSession[index].length,
            sessions: userData.sessionCount,
            negotiations: userData.negotiationsPerSession[index].length,
            negotiationTime: Math.round(userData.lengthsObj[s.user.name]) || 0,
            // negotiationTime: parseInt((userData.lengths.reduce((partialSum, a) => partialSum + a, 0)/1000/60).toFixed()),
            sessionCount: userData.sessionCountObj[s.user.name],
            sessionCountOrg:
              userData.sessionCountPerOrgObj[s.organization.name]
          };
          return table1Data;
        }
      });
    const mergeObj = {};
    tableData &&
      tableData.forEach((s) => {
        if (s !== undefined) {
          if (!mergeObj[s.name]) {
            mergeObj[s.name] = s;
          } else {
            mergeObj[s.name].modules += s.modules;
            mergeObj[s.name].negotiations += s.negotiations;
            mergeObj[s.name].negotiationTime += s.negotiationTime;
          }
        }
      });
    const mergeArr = Object.entries(mergeObj).map((e) => e[1]);
    await setTable1Data(mergeArr);
    reactVerbosity === 2 &&
      console.log('buildDataForTable1 TABLE1 DATA mergeArr:', mergeArr);
    return mergeArr;
  };

  const buildDataForNegTable = async () => {
    // console.log('+++++> USER DATA:', userData)
    const tableData =
      userData.sessions &&
      userData.sessions.map((s, index) => {
        // console.log("==========[> index, s:", index, s)
        return s.unitysessionmodules.map((m, i) => { // eslint-disable-line
          // console.log('==========[> i, m:', i,  m)
          if (
            m.moduleType === 'negotiation' &&
            m.userScore !== -1 &&
            m.endTime - m.startTime > 0 &&
            (privacy > 0 || s.userId === user.email)
          ) {
            let date = new Date(s.sessionStartTime).toISOString().split('T')[0];
            const dateArr = date.split('-');
            date = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];
            return {
              negotiation: m.moduleName,
              user: s.user.name,
              userScore: m.userScore,
              maxScore: m.maxScore,
              date
            };
          }
        });
      });
    // const arrFiltered = tableData.filter((e) => e[0] !== null);
    const arrFiltered = await filterNull(tableData);
    const flattened = arrFiltered.flat();
    const flattenedFiltered = flattened.filter((e) => !Array.isArray(e));
    // const flattenedFiltered = flattened.filter((elements) => {
    //   return elements !== null && elements !== undefined;
    // });
    //
    setNegTableData(flattenedFiltered);
    reactVerbosity === 2 &&
      console.log('===> buildDataForNegTable flattenedFiltered DATA:', flattenedFiltered);
    return flattenedFiltered;
  };

  const buildDataForTrainingProgressTable = async () => {
    console.log('!!!! chapterGroup:', chapterGroup)
    // console.log('+++++> USER DATA:', userData)
    // userData.sessions ==> sessions with length, modules and a user
    const lessons = {};
    const quizzes = {};

    const tableData =
      userData.sessions &&
      userData.sessions.map((s, index) => {
        // console.log('==========[> index, s:', index, s);
        if (s.userId === user.email) {
          return s.unitysessionmodules.map((m, i) => {  // eslint-disable-line
            // console.log('==========[> i, m:', i,  m)
            if (m.moduleType === 'lesson' && m.userScore !== -1) {
              let date = new Date(s.sessionStartTime).toISOString().split('T')[0];
              const dateArr = date.split('-');
              date = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

              if (!lessons[s.user.name]) lessons[s.user.name] = {};
              if (!lessons[s.user.name][m.moduleName]) { lessons[s.user.name][m.moduleName] = {}; }
              lessons[s.user.name][m.moduleName] = {
                moduleType: m.moduleType,
                module: m.moduleName,
                user: s.user.name,
                userScore: m.userScore,
                complete: m.userScore === -1 ? 'X' : '\u2713',
                date
              };
            }
            if (m.moduleType === 'quiz' && m.userScore !== -1) {
              let date = new Date(s.sessionStartTime).toISOString().split('T')[0];
              const dateArr = date.split('-');
              date = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

              if (!quizzes[s.user.name]) quizzes[s.user.name] = {};
              if (!quizzes[s.user.name][m.moduleName]) { quizzes[s.user.name][m.moduleName] = {}; }
              quizzes[s.user.name][m.moduleName] = {
                moduleType: m.moduleType,
                module: m.moduleName,
                user: s.user.name,
                userScore: m.userScore,
                complete: m.userScore === -1 ? 'X' : '\u2713',
                date
              };
            }
            if (m.moduleType !== 'negotiation') {
              let date = new Date(s.sessionStartTime).toISOString().split('T')[0];
              const dateArr = date.split('-');
              date = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];
              return {
                moduleType: m.moduleType,
                module: m.moduleName,
                user: s.user.name,
                userScore: m.userScore,
                complete: m.userScore === -1 ? 'X' : '\u2713',
                date
              };
            };
          });
        } else {
          return [null];
        };
      });
    // console.log('=====> tableData:', tableData);
    // const arrFiltered = tableData.filter((e) => e[0] !== null && e[0] !== undefined);
    const arrFiltered = await filterNull(tableData);
    const flattened = arrFiltered.flat();
    // const flattenedFiltered = flattened.filter((elements) => {
    //   return elements !== null && elements !== undefined;
    // });
    const flattenedFiltered = flattened.filter((e) => !Array.isArray(e));
    reactVerbosity === 2 &&
      console.log(
        '=============> buildDataForTrainingProgressTable flattenedFiltered DATA:',
        flattenedFiltered
      );
    reactVerbosity === 2 && console.log('==========> chapters:', chapters);
    console.log('==========> chapters:', chapters);
    let chapterLessons = [];
    let chapterQuizzes = [];
    chapters &&
      chapters.forEach((c) => {
        c.lessons.forEach((l) => {
          chapterLessons = [
            ...chapterLessons,
            {
              chapter: c.title,
              chapterId: c._id,
              chapterIndex: c.chapterIndex,
              number: l.number,
              moduleType: 'lesson',
              module: l.title,
              userScore: -1,
              complete: 'X',
              date: ''
            }
          ];
        });
        c.quizzes.forEach((q) => {
          chapterQuizzes = [
            ...chapterQuizzes,
            {
              chapter: c.title,
              chapterId: c._id,
              chapterIndex: c.chapterIndex,
              number: q.number,
              moduleType: 'quiz',
              module: q.title,
              userScore: -1,
              complete: 'X',
              date: ''
            }
          ];
        });
      });
    const rebuiltTableData = [];
    const lessonKeys = Object.keys(lessons);
    lessonKeys.forEach((k) => {
      chapterLessons.forEach((l) => {
        l.user = k;
        if (!lessons[k][l.module]) {
          lessons[k][l.module] = { ...l };
        } else {
          lessons[k][l.module].chapter = l.chapter;
          lessons[k][l.module].number = l.number;
        }
        rebuiltTableData.push(lessons[k][l.module]);
      });
    });
    const quizKeys = Object.keys(quizzes);
    quizKeys.forEach((k) => {
      chapterQuizzes.forEach((q) => {
        q.user = k;
        if (!quizzes[k][q.module]) {
          quizzes[k][q.module] = { ...q };
        } else {
          quizzes[k][q.module].chapter = q.chapter;
          quizzes[k][q.module].number = q.number;
        }
        rebuiltTableData.push(quizzes[k][q.module]);
      });
    });
    reactVerbosity === 2 && console.log('===> rebuiltTableData:', rebuiltTableData);
    console.log('===> rebuiltTableData:', rebuiltTableData);
    console.log()
    let chapterGroupObj = {};
    // chapterGroup && chapterGroup.data.chapters.forEach((id) => {
    //   chapterGroupObj[id] = [];
    // })
    rebuiltTableData.forEach((m) => {
      // if (m.chapterId) {
        if (!chapterGroupObj[m.chapterIndex]) chapterGroupObj[m.chapterIndex] = [];
        chapterGroupObj[m.chapterIndex] = [...chapterGroupObj[m.chapterIndex], m];
      // }
    })
    console.log('chapterGroupObj:', chapterGroupObj)
    // SORT by chapterGroup
    // rebuiltTableData.forEach((m) => {
    //   console.log('m.chapterId:', m.chapterId, chapterGroupObj[m.chapterId])
    //   if (m.chapterId) {
    //     chapterGroupObj[m.chapterId] = [...chapterGroupObj[m.chapterId], m]
    //   }
    // })
    // console.log('chapterGroupObj filled:', chapterGroupObj)
    const cgKeys = Object.keys(chapterGroupObj);

    let concatenatedTableData = [];
    cgKeys.map((k) => {
      return concatenatedTableData = [...concatenatedTableData, chapterGroupObj[k]]
    })
    console.log('---> concatenatedTableData:', concatenatedTableData.flat())
    setTrainingProgData(concatenatedTableData.flat());
    return concatenatedTableData.flat();
  };

  const filterNull = (tableData) => {
    return tableData.map((e) => {
      return e.map((m) => {
        if (m !== null && m !== undefined) {
          return m;
        }
        return [];
      });
    });
  };

  const setDefaultDates = async (start, end) => {
    await setStartDate(start);
    await setEndDate(end);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <div className="page-grid">
      <div className="leader-page-container">
        <div className="leader-page">
          <div className="leader-page-grid">
            <div className="leader-page-date-range-selector">
              {!loadTest && (
                <DateSelection
                  start={startDate}
                  end={endDate}
                  setDefaultDates={setDefaultDates}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                />
              )}
            </div>
            <div className="leader-page-sect-2">
              <div className="leader-page-total-sessions">
                {!loadTest && (
                  <Total
                    id="Sessions"
                    label="Sessions"
                    value={userData.sessionCount}
                    width={70}
                    height={70}
                    borderRadius={30}
                  />
                )}
              </div>
              <div className="leader-page-total-time">
                {!loadTest && (
                  <Total
                    label="Time"
                    units="min"
                    value={duration}
                    width={70}
                    height={70}
                    borderRadius={30}
                  />
                )}
              </div>
              <div className="leader-page-total-negotiations">
                {!loadTest && (
                  <Total
                    label="Negotiations"
                    units=""
                    value={negotiationCount}
                    width={70}
                    height={70}
                    borderRadius={30}
                  />
                )}
              </div>
              <div className="leader-page-total-negotiation-time">
                {!loadTest && (
                  <Total
                    label=" Negotiation"
                    units="min"
                    value={(negotiationTime / 1000 / 60).toFixed(0)}
                    width={70}
                    height={70}
                    borderRadius={30}
                  />
                )}
              </div>
            </div>
            <div className="leader-page-sect-3">
              {true && userData.sessionsPerDate && (
                <div className="admin-page-graph-1">
                  {!loadTest && (
                    <LeftComboGraph
                      sessionsPerDate={[userData.sessionsPerDate]}
                      sessionTimePerDate={userData.sessionTimePerDate}
                      text={['Sessions vs. Date', 'Session Time vs. Date']}
                    />
                  )}
                </div>
              )}
              {true && userData.negotiationTimePerDate && (
                <div className="admin-page-graph-2">
                  <RightComboGraph
                    negotiationTimePerDate={userData.negotiationTimePerDate}
                  />
                </div>
              )}
            </div>
            <div className="leader-page-sect-5">
              {true && (
                <div className="leader-page-table-1-grid">
                  <div className="leader-page-table-1-header">
                    <div className="leader-page-table1-label">Trainee Analytics</div>
                  </div>
                  {true && (
                    <div className="leader-page-table-1">
                      <Table1
                        data={table1Data}
                        maxModuleCount={maxModuleCount}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="leader-page-sect-7">
              {true && (
                <div className="leader-page-table-1-grid">
                  <div className="leader-page-table-1-header">
                    <div className="leader-page-table1-label">
                      Your Negotiation Scores
                    </div>
                  </div>
                  {true && (
                    <div className="leader-page-table-1">
                      <NegNameTraineeScoreTable data={negTableData} />
                    </div>
                  )}
                </div>
              )}
            </div>
            {true && (
              <div className="leader-page-sect-9">
              <div className="trainee-page-progress-grid">
                <div className="trainee-page-progress-header">
                  <div className="trainee-page-progress-label">
                    Your Training Progress
                  </div>
                </div>
                <div className="trainee-page-progress-table">
                  <TrainingProgTable tableData={trainingProgData} />
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderDash;
