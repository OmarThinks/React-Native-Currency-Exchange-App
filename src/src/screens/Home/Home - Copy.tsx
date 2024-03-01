import {Text} from '@components';
import {MainLayout} from '@hoc';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

import axios from 'axios';
import {Button} from 'react-native-paper';

type UserdataType = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

const Home = () => {
  const {t} = useTranslation();
  // console.log(i18n.language);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [userData, setUserdata] = useState<UserdataType[]>([]);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then(function (response) {
        // handle success
        //console.log(response);
        setUserdata(response.data.data);
        setTotalPages(response.data.total_pages);
        console.log(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [page]);

  console.log(totalPages);

  const canGoNext = useMemo(() => {
    if (page === totalPages) {
      return false;
    } else {
      return true;
    }
  }, [page, totalPages]);
  const canGoBack = useMemo(() => {
    if (page === 1) {
      return false;
    } else {
      return true;
    }
  }, [page]);

  return (
    <View>
      {userData.map(user => {
        //console.log(user.avatar);
        return (
          <View key={user.id}>
            <Image
              //style={styles.tinyLogo}
              //source={require('@expo/snack-static/react-native-logo.png')}
              //src={user.avatar}
              source={{uri: user.avatar}}
              style={{width: 100, height: 100}}
            />
            <Text>Image: {user.avatar}</Text>
            <Text>email: {user.email}</Text>
            <Text>first_name: {user.first_name}</Text>
            <Text>id: {user.id}</Text>
            <Text>last_name: {user.last_name}</Text>
            <View className="self-stretch h-1 bg-slate-300" />
          </View>
        );
      })}

      <View>
        <Button
          onPress={() => {
            if (canGoBack) {
              setPage(page - 1);
            }
          }}
          disabled={!canGoBack}>
          Back
        </Button>
        <Button
          onPress={() => {
            if (canGoNext) {
              setPage(page + 1);
            }
          }}
          disabled={!canGoNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

/*
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
*/

export default () => {
  const {t} = useTranslation();

  return MainLayout(Home, {
    title: t('screen.home'),
    hasBackButton: false,
  });
};
