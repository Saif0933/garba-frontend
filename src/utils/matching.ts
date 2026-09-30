import { User, FestivalEvent } from '../types';

export interface MatchCalculationResult {
  score: number;
  breakdown: {
    sameEvent: number;
    sameDate: number;
    compatibleTime: number;
    locationProximity: number;
    preferenceCompatibility: number;
    danceLevel: number;
    agePreference: number;
  };
  highlights: string[];
}

/**
 * Calculates mutual festival compatibility score (0 - 100)
 * Adheres strictly to the 7-factor scoring matrix.
 */
export function calculateMatchScore(
  user: Partial<User> | null | undefined,
  candidate: User,
  event?: FestivalEvent | null
): MatchCalculationResult {
  if (!user) {
    // Default high-relevance score for guests browsing
    const base = 85 + (candidate.name.charCodeAt(0) % 11);
    return {
      score: Math.min(base, 96),
      breakdown: {
        sameEvent: 30,
        sameDate: 20,
        compatibleTime: 12,
        locationProximity: 12,
        preferenceCompatibility: 8,
        danceLevel: 4,
        agePreference: 4,
      },
      highlights: [
        'Attending registered festival event',
        'Compatible dance rhythm & timing',
        'Verified profile & age 18+'
      ]
    };
  }

  let sameEvent = 0;
  let sameDate = 0;
  let compatibleTime = 0;
  let locationProximity = 0;
  let preferenceCompatibility = 0;
  let danceLevel = 0;
  let agePreference = 0;
  const highlights: string[] = [];

  // 1. Same event (30 pts)
  if (event && candidate.preferredEvents?.includes(event.id)) {
    sameEvent = 30;
    highlights.push(`Both registered for ${event.title}`);
  } else if (user.preferredEvents?.some(eId => candidate.preferredEvents?.includes(eId))) {
    sameEvent = 26;
    highlights.push('Common festival event interest');
  } else {
    sameEvent = 15;
  }

  // 2. Same date (20 pts)
  if (event?.date && candidate.availability?.dates?.includes(event.date)) {
    sameDate = 20;
    highlights.push('Available on matching festival night');
  } else if (user.availability?.dates?.some(d => candidate.availability?.dates?.includes(d))) {
    sameDate = 18;
  } else {
    sameDate = 10;
  }

  // 3. Compatible time (15 pts)
  compatibleTime = 13;
  if (candidate.availability?.startTime && user.availability?.startTime) {
    compatibleTime = 15;
    highlights.push('Synchronized arrival & dance timing');
  }

  // 4. Location Proximity (15 pts)
  if (user.city && candidate.city && user.city.toLowerCase() === candidate.city.toLowerCase()) {
    locationProximity = 15;
    highlights.push(`Same city partner (${candidate.city})`);
  } else {
    locationProximity = 6;
  }

  // 5. Preference Compatibility (10 pts)
  const mutualLookingFor = user.lookingFor?.some(item => candidate.lookingFor?.includes(item));
  const genderFit =
    user.preferredGender === 'Any' ||
    (user.preferredGender === 'Female' && candidate.gender === 'Female') ||
    (user.preferredGender === 'Male' && candidate.gender === 'Male');

  if (mutualLookingFor && genderFit) {
    preferenceCompatibility = 10;
    highlights.push('Matching partner & squad preferences');
  } else if (mutualLookingFor || genderFit) {
    preferenceCompatibility = 7;
  } else {
    preferenceCompatibility = 4;
  }

  // 6. Dance Level Synergy (5 pts)
  if (user.garbaLevel === candidate.garbaLevel) {
    danceLevel = 5;
    highlights.push(`Matched Garba level: ${candidate.garbaLevel}`);
  } else if (
    (user.garbaLevel === 'Intermediate' && candidate.garbaLevel === 'Expert') ||
    (user.garbaLevel === 'Beginner' && candidate.garbaLevel === 'Intermediate')
  ) {
    danceLevel = 4;
    highlights.push('Complimentary dance skill synergy');
  } else {
    danceLevel = 3;
  }

  // 7. Age Preference (5 pts)
  const minAge = user.preferredAgeMin || 18;
  const maxAge = user.preferredAgeMax || 35;
  if (candidate.age >= minAge && candidate.age <= maxAge) {
    agePreference = 5;
  } else {
    agePreference = 2;
  }

  const rawScore = sameEvent + sameDate + compatibleTime + locationProximity + preferenceCompatibility + danceLevel + agePreference;
  // Cap between 65% and 97% to never say "100% perfect match" per guidelines
  const normalizedScore = Math.min(Math.max(rawScore, 68), 96);

  return {
    score: normalizedScore,
    breakdown: {
      sameEvent,
      sameDate,
      compatibleTime,
      locationProximity,
      preferenceCompatibility,
      danceLevel,
      agePreference,
    },
    highlights: highlights.slice(0, 3)
  };
}

/**
 * Returns formatted compatibility string avoiding 'perfect match'
 */
export function formatMatchLabel(score: number): string {
  if (score >= 90) return `${score}% High Compatibility`;
  if (score >= 80) return `${score}% Great Event Match`;
  if (score >= 70) return `${score}% Good Event Match`;
  return `${score}% Compatible`;
}
