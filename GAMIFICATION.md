# LeetCore Gamification API

## Example Badge Data

The backend exposes dummy badge data from `Server/src/data/dummyBadges.js`. Example:

```json
{
  "name": "Seven Day Flame",
  "slug": "seven-day-flame",
  "description": "Stay active for seven days in a row.",
  "image": "/badges/seven-day-flame.png",
  "category": "streak",
  "rarity": "rare",
  "xpReward": 250
}
```

## Mark Daily Activity

`POST /api/v1/activity/mark`

```json
{
  "userId": "USER_ID",
  "studyMinutes": 45,
  "problemsSolved": 2,
  "sessionsCount": 1,
  "topicsLearned": ["Arrays", "Two Pointers"]
}
```

Example response:

```json
{
  "success": true,
  "message": "Daily activity created",
  "activity": {
    "date": "2026-05-19",
    "active": true,
    "studyMinutes": 45,
    "problemsSolved": 2,
    "streakCount": 4,
    "consistencyScore": 77
  },
  "stats": {
    "totalActiveDays": 24,
    "currentStreak": 4,
    "maxStreak": 12,
    "consistencyPercentage": 82
  },
  "xp": 1640,
  "level": 5
}
```

## Consistency

`GET /api/v1/activity/consistency/:userId?days=30`

```json
{
  "success": true,
  "consistencyPercentage": 82,
  "activeDays": 24,
  "totalDays": 30,
  "weekly": {
    "consistencyPercentage": 86,
    "activeDays": 6,
    "totalDays": 7
  },
  "monthly": {
    "consistencyPercentage": 82,
    "activeDays": 24,
    "totalDays": 30
  },
  "heatmap": []
}
```

## Frontend Usage

```jsx
import ConsistencyBar from "./features/Profile/components/consistencybar";
import UserBadges from "./features/gamification/components/UserBadges";
import { activityService } from "./services/activityService";

function Example({ user }) {
  const markSession = () => {
    activityService.markDailyActivity({
      studyMinutes: 30,
      problemsSolved: 1,
      topicsLearned: ["Graphs"]
    });
  };

  return (
    <>
      <button onClick={markSession}>Track session</button>
      <ConsistencyBar userId={user._id} />
      <UserBadges userId={user._id} />
    </>
  );
}
```
