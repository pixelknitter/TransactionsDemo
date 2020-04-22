import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, TransactionRow, UserHeader } from "../../components"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { compareDesc } from "date-fns"

export interface TransactionsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.charcoal,
}

const useAsyncUserTransactions = () => {
  const { userStore, transactionStore } = useStores()
  // set initial state
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!loading) return

    const loadAsync = async () => {
      // reset loading to true at start of the async call
      setLoading(true)
      await userStore.getUser()
        .then(() => setCurrentUser(userStore.currentUser))
        // sort the transactions in descending order so the latest transaction is at the top
        .then(() => setData(transactionStore.transactions.sort((a, b) => compareDesc(a.date, b.date))))
        .catch((e) => console.tron.error(e.message, e.stack))
        // ensure we stop loading when call is finished regardless of success/fail
        .finally(() => setLoading(false))
    }

    loadAsync()
  }, [loading])

  return {
    data,
    currentUser,
    loading
  }
}

export const TransactionsScreen: React.FunctionComponent<TransactionsScreenProps> = observer(() => {
  const { data, currentUser, loading } = useAsyncUserTransactions()
  return (
    <Screen style={ROOT} preset="fixed">
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        refreshing={loading}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        ListHeaderComponent={() => <UserHeader user={currentUser} />}
        stickyHeaderIndices={[0]}
      />
    </Screen>
  )
})
