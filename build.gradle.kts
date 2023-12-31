import com.moowork.gradle.node.npm.NpmTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.1"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.github.node-gradle.node") version "2.2.4"
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.spring") version "1.9.21"
    kotlin("plugin.jpa") version "1.9.21"
}

group = "com.moim"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
//    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.modelmapper:modelmapper:3.2.0")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("com.h2database:h2")
    runtimeOnly("org.postgresql:postgresql")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

allOpen {
    annotations("jakarta.persistence.Entity")
    annotations("jakarta.persistence.Embeddable")
    annotations("jakarta.persistence.MappedSuperclass")
}

node {
    version = "18.12.1"
    distBaseUrl = "https://nodejs.org/dist"

    if (System.getenv("REQUIRE_NODE_INSTALL") != null && System.getenv("REQUIRE_NODE_INSTALL") == "TRUE") {
        download = true
    } else {
        download = false
    }

    workDir = file("${project.buildDir}/nodejs")
    yarnWorkDir = file("${project.buildDir}/yarn")
    nodeModulesDir = file("${project.buildDir}")
    npmWorkDir = file("${project.buildDir}/npm")
}



val installDependencies by tasks.registering(NpmTask::class) {
    setArgs(listOf("install"))
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/moin-front")
    })
}

val buildReactTask by tasks.registering(NpmTask::class) {
    // Before buildWeb can run, installDependencies must run
    dependsOn(installDependencies)
    setArgs(listOf("run", "build"))
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/moim-front")
    })
}

val copyTask by tasks.registering(Copy::class) {
    dependsOn(buildReactTask)
    from(file("${project.projectDir}/front/build"))
    into(file("${project.buildDir}/resources/main/static"))
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}