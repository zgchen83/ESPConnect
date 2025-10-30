<template>
  <v-expand-transition>
    <div v-if="details" class="device-info-wrapper">
      <v-card class="device-card" elevation="0" variant="flat">
        <v-card-text class="device-card__body">
          <div class="device-header">
            <v-avatar class="device-avatar" size="68">
              <v-icon size="38">mdi-chip</v-icon>
            </v-avatar>
            <div class="device-header__text">
              <div class="device-chip-name">{{ details.description || details.name }}</div>
              <div v-if="hasDistinctDescription" class="device-chip-alias">
                {{ details.name }}
              </div>
              <div
                v-if="revisionLabel || details.mac"
                class="device-chip-subline"
              >
                <span v-if="revisionLabel" class="device-chip-subline-item">
                  <v-icon size="20">mdi-update</v-icon>
                  {{ revisionLabel }}
                </span>
                <span v-if="details.mac" class="device-chip-subline-item">
                  <v-icon size="20">mdi-wifi</v-icon>
                  {{ details.mac }}
                </span>
              </div>
            </div>
          </div>

          <v-row class="device-metrics" dense>
            <v-col cols="12" sm="4">
              <v-card class="metric-card" elevation="0" variant="tonal">
                <v-card-text class="metric-card__body">
                  <v-icon class="metric-icon" size="22">mdi-memory</v-icon>
                  <div class="metric-label">Flash Size</div>
                  <div class="metric-value">{{ details.flashSize || 'Unknown' }}</div>
                  <div v-if="details.crystal" class="metric-caption">
                    Crystal {{ details.crystal }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="metric-card metric-card--features" elevation="0" variant="tonal">
                <v-card-text class="metric-card__body">
                  <v-icon class="metric-icon" size="22">mdi-tune-variant</v-icon>
                  <div class="metric-label">Feature Set</div>
                  <div class="metric-value">
                    {{ details.features?.length ? `${details.features.length} enabled` : 'Not reported' }}
                  </div>
                  <div
                    v-if="details.features?.length"
                    class="metric-caption"
                  >
                    Reported capabilities
                  </div>
                  <v-chip-group
                    v-if="details.features?.length"
                    column
                    class="feature-chip-group metric-chip-group"
                  >
                    <v-chip
                      v-for="feature in details.features"
                      :key="feature"
                      class="feature-chip"
                      color="primary"
                      variant="elevated"
                      size="small"
                    >
                      <v-icon size="16" start>mdi-check-circle</v-icon>
                      {{ feature }}
                    </v-chip>
                  </v-chip-group>
                  <div v-else class="metric-chip-placeholder">
                    <v-chip size="small" variant="outlined">Not reported</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="metric-card" elevation="0" variant="tonal">
                <v-card-text class="metric-card__body">
                  <v-icon class="metric-icon" size="22">mdi-information-slab-circle</v-icon>
                  <div class="metric-label">Status</div>
                  <div class="metric-value">Ready</div>
                  <div class="metric-caption">Device details retrieved</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="details.factGroups?.length" class="detail-groups">
            <div class="section-title mb-3">
              <v-icon size="18" class="me-2">mdi-chip</v-icon>
              Hardware Details
            </div>
            <v-row dense class="detail-group-row">
              <v-col
                v-for="group in details.factGroups"
                :key="group.title"
                cols="12"
                md="6"
              >
                <v-card class="detail-card" elevation="0" variant="tonal">
                  <v-card-title class="detail-card__title">
                    <v-icon size="18" class="me-2">{{ group.icon }}</v-icon>
                    {{ group.title }}
                  </v-card-title>
                  <v-divider class="detail-card__divider" />
                  <v-card-text class="detail-card__body">
                    <div
                      v-for="fact in group.items"
                      :key="fact.label"
                      class="detail-card__item"
                    >
                      <div class="detail-card__item-label">
                        <v-icon v-if="fact.icon" size="16" class="me-2">{{ fact.icon }}</v-icon>
                        <span>{{ fact.label }}</span>
                      </div>
                      <div class="detail-card__item-value">{{ fact.value }}</div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-expand-transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  chipDetails: {
    type: Object,
    default: null,
  },
});

const details = computed(() => {
  const candidate = props.chipDetails;
  if (candidate && typeof candidate === 'object' && 'value' in candidate && !Array.isArray(candidate)) {
    return candidate.value ?? null;
  }
  return candidate ?? null;
});

const revisionLabel = computed(() => {
  const facts = details.value?.facts;
  if (!Array.isArray(facts)) return null;
  return facts.find(fact => fact.label === 'Revision')?.value ?? null;
});

const hasDistinctDescription = computed(() => {
  if (!details.value) return false;
  const { name, description } = details.value;
  return Boolean(description) && description !== name;
});

</script>

<style scoped>
.device-info-wrapper {
  position: relative;
}

.device-card {
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--v-theme-primary) 18%, transparent) 0%,
    color-mix(in srgb, var(--v-theme-surface) 95%, transparent) 100%
  );
  border: 1px solid color-mix(in srgb, var(--v-theme-primary) 16%, transparent);
  overflow: hidden;
}

.device-card__body {
  padding: clamp(20px, 4vw, 36px);
}

.device-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
}

.device-avatar {
  background: color-mix(in srgb, var(--v-theme-primary) 28%, transparent);
  color: color-mix(in srgb, var(--v-theme-primary) 85%, var(--v-theme-on-surface) 50%);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
}

.device-header__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.device-chip-name {
  font-size: clamp(1.8rem, 3.8vw, 2.4rem);
  font-weight: 680;
  letter-spacing: 0.012em;
  color: color-mix(in srgb, var(--v-theme-on-surface) 98%, transparent);
}

.device-chip-alias {
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  color: color-mix(in srgb, var(--v-theme-on-surface) 64%, transparent);
}

.device-chip-subline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 10px;
  font-size: clamp(1.05rem, 2.4vw, 1.25rem);
  font-weight: 600;
  letter-spacing: 0.015em;
  color: color-mix(in srgb, var(--v-theme-on-surface) 86%, transparent);
}

.device-chip-subline-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.device-chip-subline-item :deep(.v-icon) {
  color: inherit;
  opacity: 0.95;
}

.device-metrics {
  margin-bottom: 24px;
}

.metric-card {
  border-radius: 16px;
  background: color-mix(in srgb, var(--v-theme-surface) 88%, transparent) !important;
  border: 1px solid color-mix(in srgb, var(--v-theme-on-surface) 12%, transparent);
}

.metric-card__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 140px;
  padding: 16px;
}

.metric-icon {
  color: color-mix(in srgb, var(--v-theme-primary) 80%, transparent);
}

.metric-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: color-mix(in srgb, var(--v-theme-on-surface) 60%, transparent);
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--v-theme-on-surface) 94%, transparent);
}

.metric-caption {
  font-size: 0.78rem;
  color: color-mix(in srgb, var(--v-theme-on-surface) 55%, transparent);
}

.metric-card--features .metric-card__body {
  gap: 10px;
}

.metric-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.section-title {
  display: inline-flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--v-theme-on-surface) 80%, transparent);
  margin-bottom: 12px;
}

.feature-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
}

.feature-chip {
  border-radius: 999px;
  background: color-mix(in srgb, var(--v-theme-primary) 16%, var(--v-theme-surface) 88%) !important;
  color: color-mix(in srgb, var(--v-theme-primary) 75%, var(--v-theme-on-surface) 35%) !important;
  font-weight: 600;
}

.feature-chip :deep(.v-icon) {
  color: inherit;
  opacity: 0.9;
}

.metric-chip-placeholder {
  margin-top: 4px;
  font-size: 0.78rem;
  color: color-mix(in srgb, var(--v-theme-on-surface) 55%, transparent);
}

.detail-groups {
  margin-top: 28px;
}

.detail-group-row {
  margin-bottom: -12px;
}

.detail-card {
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--v-theme-on-surface) 10%, transparent);
  background: color-mix(in srgb, var(--v-theme-surface) 96%, transparent);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.detail-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--v-theme-on-surface) 82%, transparent);
  padding: 18px 22px 12px;
}

.detail-card__divider {
  margin: 0 18px;
}

.detail-card__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 22px 22px;
}

.detail-card__item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-card__item-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: color-mix(in srgb, var(--v-theme-on-surface) 65%, transparent);
  font-size: 0.85rem;
  letter-spacing: 0.01em;
}

.detail-card__item-value {
  font-weight: 600;
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--v-theme-on-surface) 92%, transparent);
  text-align: right;
  word-break: break-word;
}

@media (max-width: 959px) {
  .detail-group-row {
    margin-bottom: 0;
  }
}

@media (max-width: 599px) {
  .detail-card__item {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-card__item-value {
    text-align: left;
  }
}
</style>
