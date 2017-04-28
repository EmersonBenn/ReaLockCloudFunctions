# ReaLockCloudFunctions
Firebase Cloud Functions for ReaLock

When the timesOpened field on the database changes, indicating a successful unlock, this function will execute
The old passkey is concatenated with the salt and an SHA-256 is performed, generating the new key. This is
symmetric to the new passkey generation on the embedded device, which shares the same salt. The salt is to be 
kept secret from the Android app user.
