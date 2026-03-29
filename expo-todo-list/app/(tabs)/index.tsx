import { Button, Input, Text, ThemeProvider } from '@rneui/themed';
import { useState } from 'react';
import { FlatList, Text as RNText, SafeAreaView, StyleSheet, View } from 'react-native';

const COLORS = {
  bg: '#F0F4FF',
  card: '#FFFFFF',
  primary: '#6C63FF',
  success: '#2EC4B6',
  danger: '#FF6B6B',
  muted: '#B0B8D1',
  textDark: '#2D2D5B',
  textLight: '#FFFFFF',
};

const DEFAULT_TASKS = [
  { key: '1', description: 'Buy groceries', completed: false, due: '5pm today' },
  { key: '2', description: 'Walk the dog', completed: true, due: '8am today' },
  { key: '3', description: 'Do homework', completed: false, due: '11pm Friday' },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [inputText, setInputText] = useState('');
  const [dueText, setDueText] = useState('');

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;

  const toggleTask = (key: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setTasks(prev => [
      ...prev,
      {
        key: Date.now().toString(),
        description: trimmed,
        completed: false,
        due: dueText.trim() || null,
      },
    ]);
    setInputText('');
    setDueText('');
  };

  const renderTask = ({ item }) => (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      <View style={styles.cardLeft}>
        <Button
          type="clear"
          onPress={() => toggleTask(item.key)}
          buttonStyle={styles.checkButton}
          icon={{
            name: item.completed ? 'check-circle' : 'radio-button-unchecked',
            type: 'material',
            size: 26,
            color: item.completed ? COLORS.success : COLORS.muted,
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskTextCompleted,
          ]}
        >
          {item.description}
        </Text>
        {item.due ? (
          <View style={[styles.dueBadge, item.completed && styles.dueBadgeCompleted]}>
            <RNText style={[styles.dueText, item.completed && styles.dueTextCompleted]}>
              🕐 {item.due}
            </RNText>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✅ My TODO List</Text>
          <Text style={styles.headerSub}>
            {completedCount} of {tasks.length} tasks done
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { flex: progress }]} />
          <View style={{ flex: 1 - progress }} />
        </View>

        {/* Input Area */}
        <View style={styles.inputCard}>
          <Input
            placeholder="What needs to be done?"
            placeholderTextColor={COLORS.muted}
            value={inputText}
            onChangeText={setInputText}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputInner}
            onSubmitEditing={addTask}
            returnKeyType="next"
          />
          <Input
            placeholder="Due time (e.g. 3pm Friday)"
            placeholderTextColor={COLORS.muted}
            value={dueText}
            onChangeText={setDueText}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputInner}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <Button
            title="＋ Add Task"
            onPress={addTask}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonText}
          />
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
        />

      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  progressBarBg: {
    flexDirection: 'row',
    height: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 99,
    backgroundColor: '#DDE3F5',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: COLORS.primary,
    borderRadius: 99,
  },
  inputCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputInner: {
    borderBottomColor: '#DDE3F5',
  },
  inputText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  addButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  cardCompleted: {
    borderLeftColor: COLORS.success,
    opacity: 0.75,
  },
  cardLeft: {
    paddingLeft: 4,
  },
  checkButton: {
    padding: 8,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 14,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.muted,
  },
  dueBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF0FF',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
  },
  dueBadgeCompleted: {
    backgroundColor: '#E8FAF8',
  },
  dueText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  dueTextCompleted: {
    color: COLORS.success,
  },
});