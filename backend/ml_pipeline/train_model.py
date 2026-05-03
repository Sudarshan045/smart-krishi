import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

# ==========================================
# Smart Krishi - ML Model Training Pipeline
# ==========================================

# Configuration
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
DATASET_DIR = './dataset' # Directory containing subfolders of classes
MODEL_SAVE_PATH = 'crop_disease_model.h5'

def build_model(num_classes):
    print("Building MobileNetV2 base model...")
    # Load pre-trained MobileNetV2 (excluding top classification layer)
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    # Freeze the base model layers
    for layer in base_model.layers:
        layer.trainable = False

    # Add custom classification layers
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    predictions = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Compile the model
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def train():
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Dataset directory '{DATASET_DIR}' not found!")
        print("Please create it and add subfolders like 'Sugarcane_RedRot', 'Grapes_Healthy', etc.")
        return

    print("Loading Dataset...")
    # Data Augmentation & Loading
    datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        validation_split=0.2
    )

    train_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    val_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    num_classes = len(train_generator.class_indices)
    print(f"Found {num_classes} classes: {train_generator.class_indices}")

    # Save the class names mapped to their indices
    import json
    with open('class_indices.json', 'w') as f:
        json.dump(train_generator.class_indices, f)

    model = build_model(num_classes)

    print("\nStarting Training...")
    model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=val_generator
    )

    print(f"\nTraining Complete! Saving model to {MODEL_SAVE_PATH}...")
    model.save(MODEL_SAVE_PATH)
    print("Done! You can now use this model in the Flask API.")

if __name__ == '__main__':
    train()
